import Resource from './Resource'


const resources = {
    "general": {
        MESSAGE_RECORD_DIRTY: new Resource("You have pending changes, please save the record.", "Vous avez des modifications en attente de sauvegarde. Veuillez sauvegarder."),
        WAIT_POPUPTITLE: new Resource("Wait!", "Attendez!"),
        CANCEL_BTN: new Resource("Cancel", "Annuler"),
        PROCESSING: new Resource("Processing...", "En traitement...")
    },
    "broadcast": {
        PUBLISH_BTN: new Resource("Publish", "Publier"),
        UNPUBLISH_BTN: new Resource("Unpublish", "Dépublier"),
        NOTIFICATION_CONFIRMPUBLISH_TITLE: new Resource("Confirm Publish", "Confirmer la publication"),
        NOTIFICATION_CONFIRMPUBLISH_CONTENT: new Resource("Are you sure you want to publish this notification?\r\n\r\nThis notification will be shown to users.", 
            "Êtes-vous sûr de vouloir publier cette notification?\r\n\r\nCette notification sera affichée aux utilisateurs."),
        NOTIFICATION_CONFIRMUNPUBLISH_TITLE: new Resource("Confirm Unpublish", "Confirmer la dépublication"),
        NOTIFICATION_CONFIRMUNPUBLISH_CONTENT: new Resource("Are you sure you want to unpublish this notification?\r\n\r\nThis notification will no longer be shown to users.", 
            "Êtes-vous sûr de vouloir dépublier cette notification?\r\n\r\nCette notification ne sera plus affichée aux utilisateurs.")

    }

};


export  {
    resources
}