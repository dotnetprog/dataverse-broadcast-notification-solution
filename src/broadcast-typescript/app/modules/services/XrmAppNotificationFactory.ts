import { fdn_actiontype, fdn_broadcastappnotification, fdn_level, fdn_localizednotificationcontent } from "@app/modules/domain";
import * as utilities from '@app/modules/common/utility';
const LevelMappings = {
    [fdn_level.Success.toString()]: 1,
    [fdn_level.Danger.toString()]: 2,
    [fdn_level.Warning.toString()]: 3,
    [fdn_level.Information.toString()]: 4
};

export interface IClientAppNotificationFactory{
    create(n:fdn_broadcastappnotification):Xrm.App.Notification;
}
export class XrmAppNotificationFactory implements IClientAppNotificationFactory{
    private _buildAction = (n:fdn_broadcastappnotification,localizedContent?:fdn_localizednotificationcontent) => {
        if(n.fdn_actiontype == fdn_actiontype.WebLink){
            return {
                actionLabel:localizedContent?.fdn_actionbuttondisplaytext ?? n.fdn_buttondefaulttext!,
                eventHandler:  () => {
                    window.open(n.fdn_buttonactionurl!, "_blank");
                }
            }
        }
        return undefined;
    };
    create(n:fdn_broadcastappnotification):Xrm.App.Notification{
        const userLang = utilities.getUserLangFromGlobalContext();
        const level = LevelMappings[n.fdn_level!.toString()];
            let msg = n.fdn_message;
            const localizedMsgObjs = n.fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification;
            const localizedObj = localizedMsgObjs && localizedMsgObjs.length > 0 ? localizedMsgObjs.find((v)=> v.fdn_language === userLang) : undefined;
            if(localizedObj !== undefined && localizedObj !== null){
                msg = localizedObj.fdn_contentmessage ?? n.fdn_message;
            }
            return {
                level: level,
                message: msg!,
                showCloseButton: false,
                type: 2,
                action: this._buildAction(n,localizedObj)
            };
    }
}
