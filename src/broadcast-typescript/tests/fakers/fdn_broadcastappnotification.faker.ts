import { fdn_actiontype, fdn_broadcastappnotification, fdn_level } from '@app/modules/domain';
import { faker } from '@faker-js/faker';
import { createBilingualLocalizedContents } from './fdn_localizednotificationcontent.faker';
export function createRandomAppNotificationWithNoAction(appid:string,localized:boolean = true):fdn_broadcastappnotification{
    return {
        fdn_appmoduleid: appid,
        fdn_broadcastappnotificationid: faker.string.uuid(),
        fdn_level: faker.helpers.enumValue(fdn_level),
        fdn_message: faker.string.alpha({length:10}),
        fdn_name:faker.string.alpha({length:10}),
        fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification: localized ?createBilingualLocalizedContents():[],
    };
}
export function createRandomAppNotificationWithWebLinkAction(appid:string,localized:boolean = true):fdn_broadcastappnotification{
    return {
        fdn_appmoduleid: appid,
        fdn_broadcastappnotificationid: faker.string.uuid(),
        fdn_level: faker.helpers.enumValue(fdn_level),
        fdn_message: faker.string.alpha({length:10}),
        fdn_name:faker.string.alpha({length:10}),
        fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification:localized? createBilingualLocalizedContents():[],
        fdn_actiontype: fdn_actiontype.WebLink,
        fdn_buttonactionurl: faker.internet.url(),
        fdn_buttondefaulttext: faker.string.alpha({length:10})
    };
}