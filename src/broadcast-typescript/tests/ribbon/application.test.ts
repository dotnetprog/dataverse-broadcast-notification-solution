import { v4 } from "uuid";
import { MockInstance } from "vitest";
import { XrmMockGenerator, XrmStaticMock } from "xrm-mock";
import { notificationStore,broadcastNotificationService } from "@app/modules/services";
import { createRandomAppNotificationWithNoAction, createRandomUiNotification } from "@tests/fakers";
import { faker } from "@faker-js/faker";
import { ribbon } from "@app/modules/ribbon";

describe("Given an application ribbon",() =>{
    const appId:string = v4();
    let result:boolean;
    let xrmMock:XrmStaticMock;
    let pagePropsSpy:MockInstance<typeof Xrm.Utility.getPageContext>;
    let appPropsSpy:MockInstance<Xrm.GlobalContext["getCurrentAppProperties"]>;
    let getCachedStoreSpy:MockInstance<typeof notificationStore.getCachedNotifications>;
    let setCachedStoreSpy:MockInstance<typeof notificationStore.setCachedNotifications>;
    let clearGlobalNotifSpy:MockInstance<typeof Xrm.App.clearGlobalNotification>;
    let getPublishedNotificationSpy:MockInstance<typeof broadcastNotificationService.getPublishedNotifications>;
    const cachedNotifications = faker.helpers.multiple(() => createRandomUiNotification(appId),{count:3}); 
    const livenotifications = faker.helpers.multiple(() => createRandomAppNotificationWithNoAction(appId),{count:3});
    beforeEach(() => {
        xrmMock = XrmMockGenerator.initialise();
        const ctx = xrmMock.Utility.getGlobalContext();
        ctx.userSettings.languageId = 1033;
        ctx.getCurrentAppProperties = vitest.fn();
        appPropsSpy = vitest.spyOn(ctx,"getCurrentAppProperties").mockResolvedValue({appId});
        Xrm.Utility.getPageContext = vitest.fn();
        pagePropsSpy = vitest.spyOn(Xrm.Utility,"getPageContext").mockReturnValue({
            input:{
                pageType:"entitylist",
                entityName: "random"
            }
        });
        getCachedStoreSpy = vitest.spyOn(notificationStore,"getCachedNotifications").mockReturnValue(cachedNotifications);
        setCachedStoreSpy = vitest.spyOn(notificationStore,"setCachedNotifications");
        Xrm.App.clearGlobalNotification = vitest.fn();
        clearGlobalNotifSpy = vitest.spyOn(Xrm.App,"clearGlobalNotification");
        getPublishedNotificationSpy = vitest.spyOn(broadcastNotificationService,"getPublishedNotifications").mockResolvedValue(livenotifications);
        
    });
    describe("When it renders notifications on the right page",() =>{
        
        let uids:string[];
        beforeEach(async () => {
            result = await ribbon.application.renderNotifications("entitylist");
            uids = Object.keys(xrmMock.App.globalNotifications);
        })
        test("Then It should return false",() => {
            expect(result).toBeFalsy();
        });
        test("Then It should get cached notifications from store",() => {
            expect(getCachedStoreSpy).toHaveBeenCalledWith(appId);
        });
        test("Then It should remove the cached notifications from ui",() => {
            cachedNotifications.forEach(n => {
                expect(clearGlobalNotifSpy).toHaveBeenCalledWith(n.uid);
            });
        });
        test("Then It should retrieve published notifications for the app",() => {
            expect(getPublishedNotificationSpy).toHaveBeenCalledWith(appId);
        });
        test("Then It should display the published notifications to the ui",() => {
            expect(uids).toHaveLength(3);
        });
        test("Then It should cache the generated notification uids to the store",() => {
            const expectedData = uids.map(uid => {
                return expect.objectContaining({uid,data:expect.anything()});
            });
            expect(setCachedStoreSpy).toHaveBeenCalledWith(appId,expect.arrayContaining(expectedData));
            
        });
    });
    describe("When it renders notification on the wrong page",() => {
        beforeEach(async () => {
            result = await ribbon.application.renderNotifications("dashboard");
           
        });
        test("Then It should return false",() => {
            expect(result).toBeFalsy();
        });
        test("Then It should not read app properties",() => {
            expect(appPropsSpy).not.toHaveBeenCalled();
        });
    });
    describe("When it renders notification on the right page outside of a modern-driven app context",() => {
        beforeEach(async () => {
            appPropsSpy.mockClear().mockResolvedValue({});
            result = await ribbon.application.renderNotifications("entitylist");
           
        });
        test("Then It should return false",() => {
            expect(result).toBeFalsy();
        });
        test("Then It should read app properties",() => {
            expect(appPropsSpy).toHaveBeenCalled();
        });
        test("Then It should not get cached notifications",() => {
            expect(getCachedStoreSpy).not.toHaveBeenCalled();
        });
    });
    describe("When it renders notifications and there's an exception",() => {
        const expectedError = {error:'test'};
        let consoleErrorSpy:MockInstance<typeof console.error>;
        beforeEach(async () => {
            appPropsSpy.mockClear().mockRejectedValue(expectedError);
            consoleErrorSpy = vitest.spyOn(console,"error");
            result = await ribbon.application.renderNotifications("entitylist");
           
        });
        test("Then It should return false",() => {
            expect(result).toBeFalsy();
        });
        test("Then It should log in console",() => {
            expect(console.error).toHaveBeenCalledWith(expectedError);
        });
       
    });

});