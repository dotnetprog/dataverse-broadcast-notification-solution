import { XrmMockGenerator } from "xrm-mock";
import { notificationStore } from "@app/modules/services";
import { v4 as uuidv4 } from 'uuid'; 
import { NotificationUI } from "@app/modules/domain";
import { createRandomUiNotification } from "@tests/fakers";
import { faker } from "@faker-js/faker";

describe('Given a localstorage notification store',() =>{
    const appid = uuidv4();
    const _storageCacheKey:string = `broascast_${appid}`;
    beforeEach(()=>{
            localStorage.clear();
        });
    describe('When it gets cached notifications',() => {
        
        test('Then the storage should provide them',() => {
            //arrange
            const notifications:NotificationUI[] = faker.helpers.multiple(() => createRandomUiNotification(appid),{count:3});
            localStorage.setItem(_storageCacheKey,JSON.stringify(notifications));
            //act
            const results = notificationStore.getCachedNotifications(appid);
            //assert
            expect(results).toStrictEqual(notifications);
        });
        test('And there are no cache , then it should return an empty array',() => {
            //act
            const results = notificationStore.getCachedNotifications(appid);
            //assert
            expect(results).toHaveLength(0);
        });
    });
    describe('When it stores notifications',() => {
        test('Then it should saves them in the storage',() =>{
            //arrange
             const notifications:NotificationUI[] = faker.helpers.multiple(() => createRandomUiNotification(appid),{count:3});

            //act
            notificationStore.setCachedNotifications(appid,notifications);
            //assert
            const expectedresults = JSON.parse(localStorage.getItem(_storageCacheKey)!);
            expect(expectedresults).toStrictEqual(notifications);
        });
    });
});