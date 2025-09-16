import { lazy } from "@app/modules/common/system";
import fdn_localizednotificationcontent from "./fdn_localizednotificationcontent";
import fdn_broadcastappnotification from "./fdn_broadcastappnotification";

class Forms{
    @lazy
    get fdn_localizednotificationcontent():fdn_localizednotificationcontent{
        return new fdn_localizednotificationcontent();
    } 
    @lazy
    get fdn_broadcastappnotification():fdn_broadcastappnotification{
        return new fdn_broadcastappnotification();
    }
}
export const forms = new Forms();