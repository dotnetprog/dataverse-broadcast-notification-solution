import { entity } from ".";
export enum fdn_language {
    English = 794560001,
    French = 794560002,
}
export type fdn_localizednotificationcontent = entity &{
    fdn_localizednotificationcontentid?:string;
    fdn_language?:fdn_language;
    fdn_name?:string;
    fdn_contentmessage?:string;
    fdn_actionbuttondisplaytext?:string;
}