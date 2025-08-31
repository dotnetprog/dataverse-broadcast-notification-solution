import { lazy } from "@app/modules/common/system";
import fdn_localizednotificationcontent from "./fdn_localizednotificationcontent";

class Forms{
    @lazy
    get fdn_localizednotificationcontent():fdn_localizednotificationcontent{
        return new fdn_localizednotificationcontent();
    } 
}
export const forms = new Forms();