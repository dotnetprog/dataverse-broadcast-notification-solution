import { BroadcastNotificationService, IBroadcastNotificationService } from "./BroadcastNotificationService";
import {  INotificationStore,StorageNotificationStore} from "./notifications.store";
export * from "./BroadcastNotificationService";
export * from "./notifications.store";



export const notificationStore:INotificationStore = new StorageNotificationStore(window.localStorage);
export const broadcastNotificationService:IBroadcastNotificationService = new BroadcastNotificationService(Xrm.WebApi,window.sessionStorage);