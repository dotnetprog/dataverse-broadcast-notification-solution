# Test Report

| 🕙 Start time | ⌛ Duration |
| --- | ---: |
| 9/4/2025, 7:53:58 AM | 1.938 s |

| | ✅ Passed | ❌ Failed | ⏩ Skipped | 🚧 Todo | ⚪ Total |
| --- | ---: | ---: | ---: | ---: | ---: |
|Test Suites|34|0|0|0|34|
|Tests|53|0|0|0|53|

## ✅ <a id="file0" href="#file0">tests\common.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\common.test.ts)]

2 passed, 0 failed, 0 skipped, 0 todo, done in 2.7991000000001804 s

```
✅ Common Module
   ✅ should have a system submodule
   ✅ should have a utility submodule
```

## ✅ <a id="file1" href="#file1">tests\form\fdn_localizednotificationcontent.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\form\fdn_localizednotificationcontent.test.ts)]

8 passed, 0 failed, 0 skipped, 0 todo, done in 10.230999999999995 s

```
✅ Given a localized notification content form › When It loads as a create type
   ✅ Then It should set name based on language and config name
   ✅ Then It should attach onChange Handler to fdn_language
   ✅ Then It should attach onChange Handler to config
✅ Given a localized notification content form › When It loads as a update type
   ✅ Then It should set name based on language and config name
   ✅ Then It should attach onChange Handler to fdn_language
   ✅ Then It should attach onChange Handler to config
✅ Given a localized notification content form › when language field value changes
   ✅ Then It should set the name
✅ Given a localized notification content form › when config field value changes
   ✅ Then It should set the name
✅ Given a localized notification content form
```

## ✅ <a id="file2" href="#file2">tests\main.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\main.test.ts)]

2 passed, 0 failed, 0 skipped, 0 todo, done in 3.1981000000000677 s

```
✅ Given the root module › When it is loading
   ✅ Then it should initialize window props
✅ Given the root module
✅ MainModule
   ✅ should have a form property defined
```

## ✅ <a id="file3" href="#file3">tests\ribbon\application.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\ribbon\application.test.ts)]

13 passed, 0 failed, 0 skipped, 0 todo, done in 21.039600000000064 s

```
✅ Given an application ribbon › When it renders notifications on the right page
   ✅ Then It should return false
   ✅ Then It should get cached notifications from store
   ✅ Then It should remove the cached notifications from ui
   ✅ Then It should retrieve published notifications for the app
   ✅ Then It should display the published notifications to the ui
   ✅ Then It should cache the generated notification uids to the store
✅ Given an application ribbon › When it renders notification on the wrong page
   ✅ Then It should return false
   ✅ Then It should not read app properties
✅ Given an application ribbon › When it renders notification on the right page outside of a modern-driven app context
   ✅ Then It should return false
   ✅ Then It should read app properties
   ✅ Then It should not get cached notifications
✅ Given an application ribbon › When it renders notifications and there's an exception
   ✅ Then It should return false
   ✅ Then It should log in console
✅ Given an application ribbon
```

## ✅ <a id="file4" href="#file4">tests\ribbon\fdn_broadcastappnotification.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\ribbon\fdn_broadcastappnotification.test.ts)]

20 passed, 0 failed, 0 skipped, 0 todo, done in 53.18339999999989 s

```
✅ Given a broadcast app notification ribbon › When form is dirty and publish button is clicked
   ✅ Then It should not display ConfirmDialog
   ✅ Then It should display alert dialog to notify unsaved changes
✅ Given a broadcast app notification ribbon › When the publish button is clicked and it's confirmed
   ✅ Then It should show progress indicator with proper message
   ✅ Then It should display confirmation dialog with proper content
   ✅ Then It should use the broadcast notification service to publish
   ✅ Then It should refresh the ribbon
   ✅ Then It should refresh the form
   ✅ Then It should close progress indicator
✅ Given a broadcast app notification ribbon › When the publish button is clicked and it's not confirmed
   ✅ Then It should not show progress indicator with proper message
   ✅ Then It should display confirmation dialog with proper content
   ✅ Then It should not use the broadcast notification service to publish
✅ Given a broadcast app notification ribbon › When the unpublish button is clicked and it's confirmed
   ✅ Then It should show progress indicator with proper message
   ✅ Then It should display confirmation dialog with proper content
   ✅ Then It should refresh the ribbon
   ✅ Then It should refresh the form
   ✅ Then It should close progress indicator
   ✅ Then It should use the broadcast notification service to unpublish
✅ Given a broadcast app notification ribbon › When the unpublish button is clicked and it's not confirmed
   ✅ Then It should not show progress indicator with proper message
   ✅ Then It should display confirmation dialog with proper content
   ✅ Then It should use the broadcast notification service to unpublish
✅ Given a broadcast app notification ribbon
```

## ✅ <a id="file5" href="#file5">tests\services\BroadcastNotificationService.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\services\BroadcastNotificationService.test.ts)]

5 passed, 0 failed, 0 skipped, 0 todo, done in 10.698999999999842 s

```
✅ Given a broadcast notification service › When it retrieves published notifications
   ✅ Then It should call dataverse api if not cached
   ✅ Then It should not call dataverse api if cached and not expired
   ✅ Then It should call dataverse api if cache is expired
✅ Given a broadcast notification service › When it publishes a notification
   ✅ Then It Should update state and status properly
✅ Given a broadcast notification service › When it unpublishes a notification
   ✅ Then It Should update state and status properly
✅ Given a broadcast notification service
```

## ✅ <a id="file6" href="#file6">tests\services\notifications.store.test.ts</a> [[link](https://github.com/dotnetprog/dataverse-broadcast-notification-solution/blob/5a9cf833026321eb8eea0e634a986d4131a41319/src\broadcast-typescript/tests\services\notifications.store.test.ts)]

3 passed, 0 failed, 0 skipped, 0 todo, done in 10.274200000000064 s

```
✅ Given a localstorage notification store › When it gets cached notifications
   ✅ Then the storage should provide them
   ✅ And there are no cache , then it should return an empty array
✅ Given a localstorage notification store › When it stores notifications
   ✅ Then it should saves them in the storage
✅ Given a localstorage notification store
```
