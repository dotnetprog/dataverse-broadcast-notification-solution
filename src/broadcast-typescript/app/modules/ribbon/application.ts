import { notificationStore,broadcastNotificationService,clientNotificationFactory } from "@app/modules/services";
import { NotificationUI } from "@app/modules/domain";
export default class {
    //broadcast.ribbon.application.renderNotifications
    async renderNotifications(targetpage?:string){
        try
        {
            const pageType = Xrm.Utility.getPageContext()?.input?.pageType;

            if(!pageType || pageType !== targetpage){
                return false;
            }

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
                const dataverseNotification =clientNotificationFactory.create(n);
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
