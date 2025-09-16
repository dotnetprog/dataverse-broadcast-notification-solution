import { fdn_language } from "@app/modules/domain";

export function getUserLangFromGlobalContext(){
    const userLang = Xrm.Utility.getGlobalContext().userSettings.languageId;
    switch(userLang){
        case 1036:
            return fdn_language.French;
        default:
            return fdn_language.English;
    }
}