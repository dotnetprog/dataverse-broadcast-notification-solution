import { NotificationUI } from "@app/modules/domain";

export interface INotificationStore {
    getCachedNotifications(appid:string): NotificationUI[];
    setCachedNotifications(appid:string,data:NotificationUI[]):void;
}
class StorageNotificationStore implements INotificationStore {
    _storageCacheKey:string = "broascast_{appid}";
    constructor(private _storage:Storage) {}
    getCachedNotifications(appid: string){
        const cachekey = this._storageCacheKey.replace("{appid}", appid);
        const cached = this._storage.getItem(cachekey);
        if(cached){
            return JSON.parse(cached) as NotificationUI[];
        }
        return [];
    }
    setCachedNotifications(appid:string,data:NotificationUI[]): void {
        const cachekey = this._storageCacheKey.replace("{appid}", appid);
        const cachedValue = data ?? [];
        this._storage.setItem(cachekey, JSON.stringify(cachedValue));
    }
    
}
export const notificationStore:INotificationStore = new StorageNotificationStore(window.localStorage);