import { entity, fdn_broadcastappnotification } from "@app/modules/domain";
import * as utilities from "@app/modules/common/utility";
export type CachedValue<T> = {
    value: T;
    timestamp: number;
};
export interface IBroadcastNotificationService {
    getPublishedNotifications(appId:string):Promise<fdn_broadcastappnotification[]>;
    Publish(id:string):Promise<void>;
    Unpublish(id:string):Promise<void>;  
}
export class BroadcastNotificationService implements IBroadcastNotificationService {
    constructor(private webApi: Xrm.WebApi,private _storage:Storage) {
        this._userLang = utilities.getUserLangFromGlobalContext();
    }
    _cacheKey:string = "broadcast_published_{appid}";
    _expirationInSeconds:number = 60 * 5; // 5 minutes
    _userLang:number;
    _getExpiration():number{
        const now = Date.now();
        const expirationTimestamp = now + (this._expirationInSeconds * 1000);
        return expirationTimestamp;
    }
    async getPublishedNotifications(appId:string): Promise<fdn_broadcastappnotification[]> {
        const currentKey = this._cacheKey.replace("{appid}", appId);
        const cached = this._storage.getItem(currentKey) as string;
        const now = Date.now();
        if(cached){
            const cachedValue = JSON.parse(cached) as CachedValue<fdn_broadcastappnotification[]>;
            if(cachedValue.timestamp > now){
                return cachedValue.value;
            }
            this._storage.removeItem(currentKey);
        }
        const filterOptions = `&$filter=statuscode eq 2 and fdn_appmoduleid eq '${appId}'&$orderby=fdn_level asc`;
        const columns = ["fdn_appmoduleid",
            "fdn_message",
            "fdn_broadcastappnotificationid",
            "fdn_level",
            "fdn_buttondefaulttext",
            "fdn_buttonactionurl",
            "fdn_actiontype"
        ];
        const expandColumns = ['fdn_language','fdn_contentmessage','fdn_actionbuttondisplaytext'];
        const expandOptions = `&$expand=fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification($select=${expandColumns.join(',')};$filter=statecode eq 0)`;
        const queryOptions = `?$select=${columns.join(',')}`+expandOptions+filterOptions;
        const result = await this.webApi.retrieveMultipleRecords("fdn_broadcastappnotification", queryOptions);
        const notifications = result.entities as fdn_broadcastappnotification[];
        const toCache:CachedValue<fdn_broadcastappnotification[]> = {
            value: notifications
            .map(cleanNotification),
            timestamp: this._getExpiration()
        };
        this._storage.setItem(currentKey, JSON.stringify(toCache));
        return notifications;
    }
    async Publish(id:string): Promise<void> {       
        await Xrm.WebApi.updateRecord("fdn_broadcastappnotification", id, {statecode: 1, statuscode: 2});
    }
    async Unpublish(id:string): Promise<void> {
        await Xrm.WebApi.updateRecord("fdn_broadcastappnotification", id, {statecode: 0, statuscode: 1});
    }
}
function cleanNotification(e:fdn_broadcastappnotification){
    const keysToKeep = [
        "fdn_appmoduleid",
        "fdn_message",
        "fdn_broadcastappnotificationid",
        "fdn_level",
        "fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification",
        "fdn_buttondefaulttext",
        "fdn_buttonactionurl",
        "fdn_actiontype"];
    let n = removeODataGarbages(e,keysToKeep);
    const lmg = n.fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification;
    if(!lmg || lmg.length === 0){
        return n;
    }
    lmg.map(l => removeODataGarbages(l,["fdn_contentmessage","fdn_language","fdn_actionbuttondisplaytext"]));
    return n;
}
function removeODataGarbages<T>(e:T,keys:string[]){
    for(const f in e){
        if(!keys.includes(f)){
            delete e[f];
        }
    }
    return e;
}


