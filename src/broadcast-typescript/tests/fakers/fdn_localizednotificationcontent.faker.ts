import { fdn_language, fdn_localizednotificationcontent } from '@app/modules/domain';
import { faker } from '@faker-js/faker';
export function createRandomLocalizedContent(lang:fdn_language = fdn_language.English):fdn_localizednotificationcontent{
    return {
       fdn_contentmessage:faker.string.alpha({length:10}),
       fdn_language: lang,
       fdn_localizednotificationcontentid:faker.string.uuid(),
       fdn_name: faker.string.alpha({length:10}),
       fdn_actionbuttondisplaytext: faker.string.alpha({length:10})        
    };
}
export function createBilingualLocalizedContents():fdn_localizednotificationcontent[]{
    return [
        createRandomLocalizedContent(fdn_language.English),
        createRandomLocalizedContent(fdn_language.French)
    ];
}