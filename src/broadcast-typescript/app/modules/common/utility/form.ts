import  {resources}  from "@app/modules/common/system/localization";
export async function notifyIfDirty(formContext: Xrm.FormContext): Promise<boolean> {
    if (formContext.data.entity.getIsDirty()) {
        await Xrm.Navigation.openAlertDialog({title:resources.general.WAIT_POPUPTITLE.toString(), text: resources.general.MESSAGE_RECORD_DIRTY.toString()});
        return true;
    }
    return false;
}

export function registerOnChangeHandler(formContext:Xrm.FormContext,
    attributeName:string,handler: Xrm.Events.Attribute.ChangeEventHandler,
    callerObject:any):void{
    const attribute = formContext.getAttribute(attributeName);
    attribute?.addOnChange(handler.bind(callerObject));
}