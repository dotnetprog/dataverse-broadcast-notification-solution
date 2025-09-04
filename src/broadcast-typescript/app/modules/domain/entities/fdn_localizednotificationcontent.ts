import { entity } from ".";
export enum fdn_language {
    English = 794560000,
    French = 794560001,
}
export type fdn_localizednotificationcontent = entity &{
    fdn_localizednotificationcontentid?:string;
    fdn_language?:fdn_language;
    fdn_name?:string;
    fdn_contentmessage?:string;
}