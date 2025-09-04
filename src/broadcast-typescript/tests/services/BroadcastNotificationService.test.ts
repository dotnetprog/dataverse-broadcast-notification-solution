import { fdn_broadcastappnotification } from "@app/modules/domain";
import { broadcastNotificationService, CachedValue } from "@app/modules/services";
import { faker } from "@faker-js/faker";
import { createRandomAppNotification } from "@tests/fakers";
import { simpleRetrieveMultipleMock } from "@tests/helpers/mockHelpers";
import { v4 } from "uuid";
import { MockInstance } from "vitest";

describe("Given a broadcast notification service",() => {
    const appId = v4();
    const _cacheKey:string = `broadcast_published_${appId}`;
    describe("When it retrieves published notifications",()=>{
        let retrieveMultipleSpy:MockInstance<typeof Xrm.WebApi.retrieveMultipleRecords>;
        const notifications:fdn_broadcastappnotification[] = 
                faker.helpers.multiple(() =>createRandomAppNotification(appId),{count:2});
        const filterOptions = `&$filter=statuscode eq 2 and fdn_appmoduleid eq '${appId}'&$orderby=fdn_level asc`;
        const columns = ["fdn_appmoduleid",
            "fdn_message",
            "fdn_broadcastappnotificationid",
            "fdn_level"
        ];
        const expandOptions = `&$expand=fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification($select=fdn_contentmessage,fdn_language;$filter=statecode eq 0)`;
        const expectedQueryOptions = `?$select=${columns.join(',')}`+expandOptions+filterOptions;
        beforeEach(() =>{
            retrieveMultipleSpy = simpleRetrieveMultipleMock(notifications);
        })
        test("Then It should call dataverse api if not cached",async () => {
            //arrange
            notifications[0].randomAttribute = ":";
            //act
            const result = await broadcastNotificationService.getPublishedNotifications(appId);
            //assert
            const cachedItems = JSON.parse(sessionStorage.getItem(_cacheKey)!) as CachedValue<fdn_broadcastappnotification[]>
            expect(retrieveMultipleSpy).toHaveBeenCalledWith("fdn_broadcastappnotification",expectedQueryOptions);
            expect(result[0].randomAttribute).toBeUndefined(); 
            expect(cachedItems.timestamp).toBeGreaterThan(Date.now());
            expect(cachedItems.value).toStrictEqual(notifications);          
        });
        test("Then It should not call dataverse api if cached and not expired",async () => {
            //arrange
            const cachedItems:CachedValue<fdn_broadcastappnotification[]> ={
                timestamp: Date.now() + ((60*5) * 1000),
                value:notifications
            };
            sessionStorage.setItem(_cacheKey,JSON.stringify(cachedItems));
            //act
            const result = await broadcastNotificationService.getPublishedNotifications(appId);
            //assert
            
            expect(retrieveMultipleSpy).not.toBeCalled();
            expect(result).toStrictEqual(cachedItems.value);    
        });
         test("Then It should call dataverse api if cache is expired",async () => {
            //arrange
            const cachedItems:CachedValue<fdn_broadcastappnotification[]> ={
                timestamp: Date.now() - ((60*5) * 1000),
                value:faker.helpers.multiple(() =>createRandomAppNotification(appId),{count:1})
            };
            sessionStorage.setItem(_cacheKey,JSON.stringify(cachedItems));
            //act
            const result = await broadcastNotificationService.getPublishedNotifications(appId);
            //assert
            const newCachedItems = JSON.parse(sessionStorage.getItem(_cacheKey)!) as CachedValue<fdn_broadcastappnotification[]>
            expect(newCachedItems.timestamp).toBeGreaterThan(cachedItems.timestamp);
            expect(newCachedItems.value).toStrictEqual(notifications);
            expect(retrieveMultipleSpy).toHaveBeenCalledWith("fdn_broadcastappnotification",expectedQueryOptions);
            expect(result).toStrictEqual(notifications);    
        });
    });
    describe("When it publishes a notification",() => {
        let spyUpdate:MockInstance<typeof Xrm.WebApi.updateRecord>;
        let notifId:string;
        beforeAll(() => {
            spyUpdate = vitest.spyOn(Xrm.WebApi,"updateRecord").mockResolvedValue(null as any);
            notifId = v4();
        });
        test("Then It Should update state and status properly",async () => {
            await broadcastNotificationService.Publish(notifId);
            expect(spyUpdate).toBeCalledWith("fdn_broadcastappnotification",notifId,{statecode: 1, statuscode: 2});
        })
    });
     describe("When it unpublishes a notification",() => {
        let spyUpdate:MockInstance<typeof Xrm.WebApi.updateRecord>;
        let notifId:string;
        beforeAll(() => {
            spyUpdate = vitest.spyOn(Xrm.WebApi,"updateRecord").mockResolvedValue(null as any);
            notifId = v4();
        });
        test("Then It Should update state and status properly",async () => {
            await broadcastNotificationService.Unpublish(notifId);
            expect(spyUpdate).toBeCalledWith("fdn_broadcastappnotification",notifId,{statecode: 0, statuscode: 1});
        })
    });
});