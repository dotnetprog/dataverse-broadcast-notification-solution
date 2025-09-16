import { NotificationUI } from '@app/modules/domain';
import { faker } from '@faker-js/faker';
import { createRandomAppNotificationWithNoAction } from './fdn_broadcastappnotification.faker';
export function createRandomUiNotification(appid:string) : NotificationUI {
  return {
    uid:faker.string.uuid(),
    data:createRandomAppNotificationWithNoAction(appid)
  };
}