import { lazy } from "@app/modules/common/system";
import application from "./application";
import fdn_broadcastappnotification from "./fdn_broadcastappnotification";

class Ribbon {
    @lazy
    get application():application{
        return new application();
    }
    @lazy
    get fdn_broadcastappnotification():fdn_broadcastappnotification{
        return new fdn_broadcastappnotification();
    }
}

export const ribbon = new Ribbon();