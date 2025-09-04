import { fdn_localizednotificationcontent } from '@app/modules/domain';
import { faker } from '@faker-js/faker';
export function createRandomLocalizedContent():fdn_localizednotificationcontent{
    return {
       fdn_contentmessage:faker.string.alpha({length:10}),
       fdn_language: faker.number.int({min:794560000,max:794560001}),
       fdn_localizednotificationcontentid:faker.string.uuid(),
       fdn_name: faker.string.alpha({length:10})        
    };
}