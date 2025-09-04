import { ribbon } from "@app/modules/ribbon";
import { v4 } from "uuid";
import { MockInstance } from "vitest";
import { FormContextMock, XrmMockGenerator, XrmStaticMock } from "xrm-mock";
import { broadcastNotificationService } from "@app/modules/services";
import { resources } from "@app/modules/common/system/localization";
describe("Given a broadcast app notification ribbon",() =>{
    const currentRecordId = v4();
    let formContextMock: FormContextMock;
    let showProgressSpy:MockInstance<typeof Xrm.Utility.showProgressIndicator>;
    let confirmSpy: MockInstance<typeof Xrm.Navigation.openConfirmDialog>;
    let broadcastServicePublishSpy:MockInstance<typeof broadcastNotificationService.Publish>
    let broadcastServiceUnpublishSpy:MockInstance<typeof broadcastNotificationService.Unpublish>
    let xrmMock:XrmStaticMock;
    let ribbonRefreshMock:MockInstance<typeof formContextMock.ui.refreshRibbon>;
    let formRefreshMock:MockInstance<typeof formContextMock.data.refresh>;
    let formDirtySpy:MockInstance<typeof formContextMock.data.entity.getIsDirty>;
    let closeIndicator:MockInstance<typeof Xrm.Utility.closeProgressIndicator>;
    const confirmPublishStrings: Xrm.Navigation.ConfirmStrings = {
            text: resources.broadcast.NOTIFICATION_CONFIRMPUBLISH_CONTENT.toString(),
            title: resources.broadcast.NOTIFICATION_CONFIRMPUBLISH_TITLE.toString(),
            confirmButtonLabel: resources.broadcast.PUBLISH_BTN.toString(),
            cancelButtonLabel: resources.general.CANCEL_BTN.toString()
        };
    const confirmUnpublishStrings: Xrm.Navigation.ConfirmStrings = {
            text: resources.broadcast.NOTIFICATION_CONFIRMUNPUBLISH_CONTENT.toString(),
            title: resources.broadcast.NOTIFICATION_CONFIRMUNPUBLISH_TITLE.toString(),
            confirmButtonLabel: resources.broadcast.UNPUBLISH_BTN.toString(),
            cancelButtonLabel: resources.general.CANCEL_BTN.toString()
        };
    const unsavedChangesStrings = {
        title:resources.general.WAIT_POPUPTITLE.toString(), 
        text: resources.general.MESSAGE_RECORD_DIRTY.toString()
    };
    beforeEach(() =>{
        xrmMock = XrmMockGenerator.initialise();
        formContextMock = XrmMockGenerator.getFormContext();
        formContextMock.ui.refreshRibbon = vitest.fn();
        formDirtySpy = vitest.spyOn(formContextMock.data.entity,"getIsDirty");
        ribbonRefreshMock = vitest.spyOn(formContextMock.ui,"refreshRibbon");
        formContextMock.data.refresh = vitest.fn();
        formRefreshMock = vitest.spyOn(formContextMock.data,"refresh");
        vitest.spyOn(formContextMock.data.entity,"getId").mockReturnValue(currentRecordId);
        const ctx = xrmMock.Utility.getGlobalContext();
        ctx.userSettings.languageId = 1033;
        Xrm.Utility.showProgressIndicator = vitest.fn();
        showProgressSpy = vitest.spyOn(Xrm.Utility,"showProgressIndicator");
        confirmSpy = vitest.spyOn(Xrm.Navigation,"openConfirmDialog");
        broadcastServicePublishSpy = vitest.spyOn(broadcastNotificationService,"Publish").mockResolvedValue();
        broadcastServiceUnpublishSpy = vitest.spyOn(broadcastNotificationService,"Unpublish").mockResolvedValue();
        Xrm.Utility.closeProgressIndicator = vitest.fn();
        closeIndicator = vitest.spyOn(Xrm.Utility,"closeProgressIndicator");
    });
    describe("When form is dirty and publish button is clicked",() => {
        beforeEach(async () =>{
            formDirtySpy.mockReturnValue(true);
            await ribbon.fdn_broadcastappnotification.PublishNotification(formContextMock);
        })
        test("Then It should not display ConfirmDialog",() => {
            expect(confirmSpy).not.toHaveBeenCalled();
        });
        test("Then It should display alert dialog to notify unsaved changes",() => {
            expect(xrmMock.Navigation.alertDialogCalls[0].alertStrings).toStrictEqual(unsavedChangesStrings);
        });

    });
    describe("When the publish button is clicked and it's confirmed",() =>{
        beforeEach(async () =>{
            confirmSpy.mockResolvedValue({confirmed:true});
            await ribbon.fdn_broadcastappnotification.PublishNotification(formContextMock);
        });
        test("Then It should show progress indicator with proper message",() => {
            expect(showProgressSpy).toBeCalledWith(resources.general.PROCESSING.toString());
        });
        test("Then It should display confirmation dialog with proper content",() => {
            expect(confirmSpy).toHaveBeenCalledWith(confirmPublishStrings);
        });
        test("Then It should use the broadcast notification service to publish",() => {
            expect(broadcastServicePublishSpy).toHaveBeenCalledWith(currentRecordId);
        });
        test("Then It should refresh the ribbon",() => {
            expect(ribbonRefreshMock).toHaveBeenCalledWith(true);
        });
        test("Then It should refresh the form",() => {
            expect(formRefreshMock).toHaveBeenCalledWith(false);
        });
        test("Then It should close progress indicator",() => {
            expect(closeIndicator).toHaveBeenCalled();
        });
    });
    describe("When the publish button is clicked and it's not confirmed",() =>{
        beforeEach(async () =>{
            confirmSpy.mockResolvedValue({confirmed:false});
            await ribbon.fdn_broadcastappnotification.PublishNotification(formContextMock);
        });
        test("Then It should not show progress indicator with proper message",() => {
            expect(showProgressSpy).not.toHaveBeenCalled();
        });
        test("Then It should display confirmation dialog with proper content",() => {
            expect(confirmSpy).toHaveBeenCalledWith(confirmPublishStrings);
        });
        test("Then It should not use the broadcast notification service to publish",() => {
            expect(broadcastServicePublishSpy).not.toHaveBeenCalled()
        });
    });
    describe("When the unpublish button is clicked and it's confirmed",() =>{
        beforeEach(async () =>{
            confirmSpy.mockResolvedValue({confirmed:true});
            await ribbon.fdn_broadcastappnotification.UnpublishNotification(formContextMock);
        });
        test("Then It should show progress indicator with proper message",() => {
            expect(showProgressSpy).toBeCalledWith(resources.general.PROCESSING.toString());
        });
        test("Then It should display confirmation dialog with proper content",() => {
            expect(confirmSpy).toHaveBeenCalledWith(confirmUnpublishStrings);
        });
        test("Then It should refresh the ribbon",() => {
            expect(ribbonRefreshMock).toHaveBeenCalledWith(true);
        });
        test("Then It should refresh the form",() => {
            expect(formRefreshMock).toHaveBeenCalledWith(false);
        });
        test("Then It should close progress indicator",() => {
            expect(closeIndicator).toHaveBeenCalled();
        });
        test("Then It should use the broadcast notification service to unpublish",() => {
            expect(broadcastServiceUnpublishSpy).toHaveBeenCalledWith(currentRecordId);
        });
    });
     describe("When the unpublish button is clicked and it's not confirmed",() =>{
        beforeEach(async () =>{
            confirmSpy.mockResolvedValue({confirmed:false});
            await ribbon.fdn_broadcastappnotification.UnpublishNotification(formContextMock);
        });
        test("Then It should not show progress indicator with proper message",() => {
            expect(showProgressSpy).not.toHaveBeenCalled();
        });
        test("Then It should display confirmation dialog with proper content",() => {
            expect(confirmSpy).toHaveBeenCalledWith(confirmUnpublishStrings);
        });
        test("Then It should use the broadcast notification service to unpublish",() => {
            expect(broadcastServiceUnpublishSpy).not.toHaveBeenCalled();
        });
    });
});