import * as utilities from "@app/modules/common/utility";
export default class {
     //broadcast.forms.fdn_localizednotificationcontent.onLoad
    async onLoad(executionContext:Xrm.Events.LoadEventContext){
        const formContext = executionContext.getFormContext();
        utilities.registerOnChangeHandler(formContext,'fdn_language',this.onLanguageChange,this);
        utilities.registerOnChangeHandler(formContext,'fdn_appnotificationconfigid',this.onConfigChange,this);

        if(formContext.ui.getFormType() != XrmEnum.FormType.Create){
            return;
        }
        SetName(formContext);   

    }
    async onLanguageChange(eventContext:Xrm.Events.EventContext){
        const formContext = eventContext.getFormContext();
        SetName(formContext);
    }
    async onConfigChange(eventContext:Xrm.Events.EventContext){
        const formContext = eventContext.getFormContext();
        SetName(formContext);
    }
}

function SetName(formContext:Xrm.FormContext){
    const langAttribute = formContext.getAttribute<Xrm.Attributes.OptionSetAttribute>("fdn_language")!;
    const AppNotifConfigAttribute = formContext.getAttribute<Xrm.Attributes.LookupAttribute>("fdn_appnotificationconfigid")!;
    const nameAttribute = formContext.getAttribute<Xrm.Attributes.StringAttribute>("fdn_name")!;
    const lookupValue = AppNotifConfigAttribute.getValue() ? AppNotifConfigAttribute.getValue()![0] : null; 
    const configName = lookupValue?.name ?? "unknown";
    const langValue =  langAttribute.getSelectedOption();
    
    nameAttribute.setValue(`${langValue.text} - ${configName}`);

}