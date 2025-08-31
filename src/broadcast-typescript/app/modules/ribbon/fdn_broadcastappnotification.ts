import { broadcastNotificationService } from "@app/modules/services";
import * as utilities from "@app/modules/common/utility";
import { resources } from "@app/modules/common/system/localization";
export default class {
    //broadcast.ribbon.fdn_broadcastappnotification.PublishNotification
    async PublishNotification(formContext:Xrm.FormContext){
        const currentEntityId = utilities.cleanGuid(formContext.data.entity.getId());
        const isDirty = await utilities.notifyIfDirty(formContext);
        if(isDirty){
            return;
        }
        const confirmStrings: Xrm.Navigation.ConfirmStrings = {
            text: resources.broadcast.NOTIFICATION_CONFIRMPUBLISH_CONTENT.toString(),
            title: resources.broadcast.NOTIFICATION_CONFIRMPUBLISH_TITLE.toString(),
            confirmButtonLabel: resources.broadcast.PUBLISH_BTN.toString(),
            cancelButtonLabel: resources.general.CANCEL_BTN.toString()
        };
        const dialogResult = await Xrm.Navigation.openConfirmDialog(confirmStrings);
        if (!dialogResult.confirmed) {
            return;
        }
        Xrm.Utility.showProgressIndicator(resources.general.PROCESSING.toString());
        await broadcastNotificationService.Publish(currentEntityId);
        formContext.data.refresh(false);
        formContext.ui.refreshRibbon(true);
        Xrm.Utility.closeProgressIndicator();
    }
    //broadcast.ribbon.fdn_broadcastappnotification.UnpublishNotification
    async UnpublishNotification(formContext:Xrm.FormContext){
        const currentEntityId = utilities.cleanGuid(formContext.data.entity.getId());
       
        const confirmStrings: Xrm.Navigation.ConfirmStrings = {
            text: resources.broadcast.NOTIFICATION_CONFIRMUNPUBLISH_CONTENT.toString(),
            title: resources.broadcast.NOTIFICATION_CONFIRMUNPUBLISH_TITLE.toString(),
            confirmButtonLabel: resources.broadcast.UNPUBLISH_BTN.toString(),
            cancelButtonLabel: resources.general.CANCEL_BTN.toString()
        };
        const dialogResult = await Xrm.Navigation.openConfirmDialog(confirmStrings);
        if (!dialogResult.confirmed) {
            return;
        }
        Xrm.Utility.showProgressIndicator(resources.general.PROCESSING.toString());
        await broadcastNotificationService.Unpublish(currentEntityId);
        formContext.data.refresh(false);
        formContext.ui.refreshRibbon(true);
        Xrm.Utility.closeProgressIndicator();
    }
}