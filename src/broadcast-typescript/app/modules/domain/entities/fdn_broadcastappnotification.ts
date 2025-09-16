import { entity ,fdn_localizednotificationcontent} from ".";
import { fdn_actiontype } from "../optionsets";

export enum fdn_level {
    Success = 794560000,
    Danger = 794560001,
    Warning = 794560002,
    Information = 794560003
}
export class fdn_broadcastappnotification extends entity {
    fdn_level?: fdn_level;
    fdn_actiontype?: fdn_actiontype;
    fdn_message?: string;
    fdn_name?: string;
    fdn_appmoduleid?: string
    fdn_broadcastappnotificationid?: string;
    fdn_buttondefaulttext?: string;
    fdn_buttonactionurl?: string;
    fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification?:fdn_localizednotificationcontent[];

}