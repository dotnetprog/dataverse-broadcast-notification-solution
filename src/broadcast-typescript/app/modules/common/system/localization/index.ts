import Resource from './Resource'


const resources = {
    "general": {
        MESSAGE_RECORD_DIRTY: new Resource("You have pending changes, please save the record.", "Vous avez des modifications en attente de sauvegarde. Veuillez sauvegarder."),
        WAIT_POPUPTITLE: new Resource("Wait!", "Attendez!")
    },
    "salesorder": {
        MESSAGE_FOLLOWUP_INVALID: new Resource("Must be the current date, future date or none.", "Doit être la date du jour, date future ou aucune"),
        MESSAGE_PREVENT_REVISION: new Resource("You are about to revise the order. This will reset the order process step to \“Validate\” and reset the tasks. Do you want to continue?",
                                               "La correction de la commande retournera le processus à l’étape « Confirmer » et réinitialisera les tâches. Voulez-vous continuer?")

    }

};


export default {
    resources
}