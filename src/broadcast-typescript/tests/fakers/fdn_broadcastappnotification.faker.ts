import { fdn_broadcastappnotification, fdn_level } from '@app/modules/domain';
import { faker } from '@faker-js/faker';
import { createRandomLocalizedContent } from './fdn_localizednotificationcontent.faker';
export function createRandomAppNotification(appid:string):fdn_broadcastappnotification{
    return {
        fdn_appmoduleid: appid,
        fdn_broadcastappnotificationid: faker.string.uuid(),
        fdn_level: faker.helpers.enumValue(fdn_level),
        fdn_message: faker.string.alpha({length:10}),
        fdn_name:faker.string.alpha({length:10}),
        fdn_localizednotificationcontent_AppNotificationConfigId_fdn_broadcastappnotification: faker.helpers.multiple(createRandomLocalizedContent,{count:2})
    };
}