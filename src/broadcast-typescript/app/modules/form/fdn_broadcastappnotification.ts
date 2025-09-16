import * as utilities from "@app/modules/common/utility";
import { fdn_actiontype } from "@app/modules/domain";
const ActionTypeSectionMapping = {
    [fdn_actiontype.WebLink.toString()]: {
        name:"tab_action_section_url",
        mandatoryFields:['fdn_buttondefaulttext','fdn_buttonactionurl']
    }
}
export default class {
    //broadcast.forms.fdn_broadcastappnotification.onLoad
    async onLoad(executionContext: Xrm.Events.LoadEventContext) {
        const formContext = executionContext.getFormContext();

        utilities.registerOnChangeHandler(formContext, 'fdn_actiontype', this.onActionTypeChange, this);

        displayActionSectionAccordingToType(formContext);
    }
    async onActionTypeChange(executionContext: Xrm.Events.EventContext) {
        const formContext = executionContext.getFormContext();
        displayActionSectionAccordingToType(formContext);
    }
}
function displayActionSectionAccordingToType(formContext: Xrm.FormContext) {

    const actionTypeAttribute = formContext.getAttribute<Xrm.Attributes.OptionSetAttribute>("fdn_actiontype")!;
    const tab = formContext.ui.tabs.get("tab_action")!;
    const currentActionType = actionTypeAttribute.getValue() ?? -1;
    for(let key in ActionTypeSectionMapping) {
        const config = ActionTypeSectionMapping[key as keyof typeof ActionTypeSectionMapping];
        const isSectionVisible = currentActionType.toString() === key;
        tab.sections.get(config.name)?.setVisible(isSectionVisible);
        config.mandatoryFields.forEach(fieldName => {
            formContext.getAttribute(fieldName)?.setRequiredLevel(isSectionVisible ? "required" : "none");
        });
    }

}