import { XrmAppNotificationFactory } from '@app/modules/services/XrmAppNotificationFactory';
import * as utilities from '@app/modules/common/utility';
import { MockInstance } from 'vitest';
import { fdn_broadcastappnotification, fdn_language } from '@app/modules/domain';
import { createRandomAppNotificationWithNoAction,createRandomAppNotificationWithWebLinkAction } from '@tests/fakers';
import { v4 } from "uuid";
vitest.mock('@app/modules/common/utility', () => (
vitest.importActual('@app/modules/common/utility')
));
describe('Given a XrmApp Client Notification Factory',() => {
    const factory = new XrmAppNotificationFactory();
    const appid = v4();
    let notification:fdn_broadcastappnotification;
    let getUserLangFromGlobalContextSpy: MockInstance<typeof utilities.getUserLangFromGlobalContext>;
    beforeEach(() => {
        getUserLangFromGlobalContextSpy = vitest.spyOn(utilities,'getUserLangFromGlobalContext');
        getUserLangFromGlobalContextSpy.mockReturnValue(fdn_language.English);
    });
    describe('when creating a client app notification with no action',() => {
        let xrmAppNotification:Xrm.App.Notification;
        beforeEach(()=> {
            notification = createRandomAppNotificationWithNoAction(appid);
            xrmAppNotification = factory.create(notification);
        });
        it('should not have an action',() => {
            expect(xrmAppNotification.action).toBeUndefined();
        });
        it('should have proper level',() => {
            const expectedLevel = (notification.fdn_level! - 794560000) + 1;
            expect(xrmAppNotification.level).toBe(expectedLevel);
        });
        it('should have proper message content',() => {
            const expectedMessage = notification.fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification!.find((v)=> v.fdn_language === fdn_language.English)!.fdn_contentmessage!;
            expect(xrmAppNotification.message).toBe(expectedMessage);
        });
        it('should not have a dissmiss button',() => {
            expect(xrmAppNotification.showCloseButton).toBe(false);
        });
        it('should be a type of message bar',() => {
            expect(xrmAppNotification.type).toBe(2);
        });
    });
    describe('when creating a client app notification with no localized content',() => {
        let xrmAppNotification:Xrm.App.Notification;
        beforeEach(()=> {
            notification = createRandomAppNotificationWithNoAction(appid,false);
            xrmAppNotification = factory.create(notification);
        });
        it('should have proper message content',() => {
            expect(xrmAppNotification.message).toBe(notification.fdn_message!);
        });
    });
     describe('when creating a client app notification with Action',() => {
        let xrmAppNotification:Xrm.App.Notification;
        beforeEach(()=> {
            notification = createRandomAppNotificationWithWebLinkAction(appid);
            xrmAppNotification = factory.create(notification);
        });
        it('should have proper action text',() => {
            const expectedLocalizedObj = notification.fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification!.find((v)=> v.fdn_language === fdn_language.English);
            expect(xrmAppNotification.action!.actionLabel).toBe(expectedLocalizedObj!.fdn_actionbuttondisplaytext!);
        });
        it('should have an action event handler',() => {
            expect(xrmAppNotification.action!.eventHandler).toBeInstanceOf(Function);
        });
        it('should open a web page when action is clicked',() => {
            const windowOpenSpy = vitest.spyOn(window,'open').mockReturnValue(null);
            expect(xrmAppNotification.action!.eventHandler!()).toBeUndefined();
            expect(windowOpenSpy).toHaveBeenCalledWith(notification.fdn_buttonactionurl!,"_blank");
        });
    });
     describe('when creating a client app notification with Action and no localized content',() => {
        let xrmAppNotification:Xrm.App.Notification;
        beforeEach(()=> {
            notification = createRandomAppNotificationWithWebLinkAction(appid,false);
            xrmAppNotification = factory.create(notification);
        });
        it('should have proper action text',() => {
            expect(xrmAppNotification.action!.actionLabel).toBe(notification.fdn_buttondefaulttext!);
        });
       
    });
});