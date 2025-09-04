import { notificationStore,broadcastNotificationService } from "@app/modules/services";
import { fdn_broadcastappnotification, fdn_level, NotificationUI } from "@app/modules/domain";
import * as utilities from '@app/modules/common/utility';
export default class {
    //broadcast.ribbon.application.renderNotifications
    async renderNotifications(targetpage?:string){
        try
        {
            const pageType = Xrm.Utility.getPageContext()?.input?.pageType;

            if(!pageType || pageType !== targetpage){
                return false;
            }

            const userLang = utilities.getUserLangFromGlobalContext();
            console.log("broadcast renderNotifications");
            const appProps = await Xrm.Utility.getGlobalContext().getCurrentAppProperties();
            if(!appProps || !appProps.appId){
                return false;
            }
            const cachedNotifications = notificationStore.getCachedNotifications(appProps.appId);
            const clearTasks = cachedNotifications.map(n=>Xrm.App.clearGlobalNotification(n.uid));
            const livenotifications = await broadcastNotificationService.getPublishedNotifications(appProps.appId);
            await Promise.all(clearTasks);
            const data:NotificationUI[] = [];
            for(const n of livenotifications){
                const dataverseNotification = MapNotificationToDataverse(n,userLang);
                const uid = await Xrm.App.addGlobalNotification(dataverseNotification);
                data.push({
                    uid,
                    data:n
                });
            }
            notificationStore.setCachedNotifications(appProps.appId,data);
        }
        catch(e){
            console.error(e);
        }
        finally{
            return false;
        }
    }

}
function MapNotificationToDataverse(n:fdn_broadcastappnotification,userLang:number):Xrm.App.Notification{
    const level = MapToLevel(n.fdn_level!);
    let msg = n.fdn_message;
    const localizedMsgObjs = n.fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification;
    if(localizedMsgObjs && localizedMsgObjs.length > 0){
        msg = localizedMsgObjs.find((v)=> v.fdn_language === userLang)?.fdn_contentmessage ?? n.fdn_message;
    }
    return {
        level: level,
        message: msg!,
        showCloseButton: false,
        type: 2
    };
}
function MapToLevel(level:number):number{
    switch(level){
        case fdn_level.Success:
            return 1;
        case fdn_level.Danger:
            return 2;
        case fdn_level.Warning:
            return 3;
        case fdn_level.Information:
            return 4;
        default:
            return 4;
    }
   

}