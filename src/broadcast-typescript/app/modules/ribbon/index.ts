import { lazy } from "@app/modules/common/system";
import application from "./application";

class Ribbon {
    @lazy
    get application():application{
        return new application();
    }
}

export const ribbon = new Ribbon();