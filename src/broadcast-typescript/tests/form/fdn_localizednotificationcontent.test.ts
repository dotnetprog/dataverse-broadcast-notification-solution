import { fdn_language, fdn_level } from "@app/modules/domain";
import { forms } from "@app/modules/form";
import { v4 } from "uuid";
import { EventContextMock, LookupAttributeMock, OptionSetAttributeMock, OptionSetControlMock, StringAttributeMock, XrmMockGenerator } from "xrm-mock";

describe('Given a localized notification content form',() => {
    let languageAttribute:OptionSetAttributeMock;
    const existingConfig:Xrm.LookupValue ={
        entityType:'fdn_broadcastappnotification',
        id: v4(),
        name: 'Test Update'
    };
    let configAttirbute:LookupAttributeMock;
    let nameAttribute:StringAttributeMock;
    beforeEach(() => {
        XrmMockGenerator.initialise();
        const options:Xrm.OptionSetValue[] = Object.keys(fdn_language).map(k =>{
                return {
                    text:k,
                    value:fdn_language[k as keyof typeof fdn_language]
                };
             });
        languageAttribute = XrmMockGenerator.Attribute.createOptionSet("fdn_language",fdn_language.English,options);
        languageAttribute.selectedOption = options.find(o => o.value == fdn_language.English)!;
        configAttirbute = XrmMockGenerator.Attribute.createLookup("fdn_appnotificationconfigid",[existingConfig]);
        nameAttribute = XrmMockGenerator.Attribute.createString("fdn_name");
    });
    describe('When It loads as a create type',() => {
        let eventContext:EventContextMock;
        beforeEach(async () =>{
            const formContext = XrmMockGenerator.getFormContext();
            vitest.spyOn(formContext.ui,"getFormType").mockReturnValue(XrmEnum.FormType.Create);
            eventContext = XrmMockGenerator.getEventContext();
            await forms.fdn_localizednotificationcontent.onLoad(eventContext as any);
        });
        test("Then It should set name based on language and config name",() =>{
            expect(nameAttribute.getValue()).toBe(`${languageAttribute.selectedOption.text} - ${existingConfig.name}`);
        });
        test("Then It should attach onChange Handler to fdn_language",() =>{
            expect(languageAttribute.eventHandlers).toHaveLength(1);
        });
        test("Then It should attach onChange Handler to config",() =>{
            expect(configAttirbute.eventHandlers).toHaveLength(1);
        });
    });
    describe('When It loads as a update type',() => {
        let eventContext:EventContextMock;
        beforeEach(() =>{
            const formContext = XrmMockGenerator.getFormContext();
            vitest.spyOn(formContext.ui,"getFormType").mockReturnValue(XrmEnum.FormType.Update);
            eventContext = XrmMockGenerator.getEventContext();
            forms.fdn_localizednotificationcontent.onLoad(eventContext as any);
        });
        test("Then It should set name based on language and config name",() =>{
            expect(nameAttribute.getValue()).toBeNull();
        });
        test("Then It should attach onChange Handler to fdn_language",() =>{
            expect(languageAttribute.eventHandlers).toHaveLength(1);
        });
        test("Then It should attach onChange Handler to config",() =>{
            expect(configAttirbute.eventHandlers).toHaveLength(1);
        });
    });
    describe("when language field value changes",() => {
         beforeEach(async () =>{
            await forms.fdn_localizednotificationcontent.onLanguageChange(XrmMockGenerator.getEventContext() as any);
        });
        test("Then It should set the name",() =>{
             expect(nameAttribute.getValue()).toBe(`${languageAttribute.selectedOption.text} - ${existingConfig.name}`);
        })
    })
     describe("when config field value changes",() => {
         beforeEach(async () =>{
            await forms.fdn_localizednotificationcontent.onConfigChange(XrmMockGenerator.getEventContext() as any);
        });
        test("Then It should set the name",() =>{
             expect(nameAttribute.getValue()).toBe(`${languageAttribute.selectedOption.text} - ${existingConfig.name}`);
        })
    })
});