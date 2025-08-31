export function getUserLangFromGlobalContext(){
    const userLang = Xrm.Utility.getGlobalContext().userSettings.languageId;
    switch(userLang){
        case 1036:
            return 794560002;
        default:
            return 794560001;
    }
}