import { entity } from ".";

export type fdn_localizednotificationcontent = entity &{
    fdn_localizednotificationcontentid?:string;
    fdn_language?:number;
    fdn_name?:string;
    fdn_contentmessage?:string;
}