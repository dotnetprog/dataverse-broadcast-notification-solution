import { FormSelectorMock, UserSettingsMock, XrmMockGenerator, XrmStaticMock,ItemCollectionMock,FormItemMock, ContextMock, ClientContextMock, UiMock } from "xrm-mock";

export class XrmTestDriver {
    
    private userSettingsBuilder:XrmUserSettingsBuilder = new XrmUserSettingsBuilder();
    private formBuilder:XrmFormBuilder = new XrmFormBuilder();
    private clientType:Xrm.Client = "Web";
    ConfigureUserSettings(fn:(u:XrmUserSettingsBuilder) => void):XrmTestDriver{
        fn(this.userSettingsBuilder);
        return this;
    }
    ConfigureForm(fn:(f:XrmFormBuilder) => void):XrmTestDriver{
        fn(this.formBuilder);
        return this;
    }
    
    public build():XrmStaticMock{
        const xrmMock = XrmMockGenerator.initialise({
            context: new ContextMock({
                clientContext: new ClientContextMock(this.clientType,'Online'),
                orgUniqueName: "",
                userSettings: this.userSettingsBuilder.build()
            }),
            ui:new UiMock({
                formSelector: this.formBuilder.build()
            })
        });
        return xrmMock;
    }
}
class XrmUserSettingsBuilder{
    _userLcid:number = 1033
    PreferFrench():XrmUserSettingsBuilder{
        this._userLcid = 1036;
        return this;
    }
    public build():UserSettingsMock{
        return new UserSettingsMock(
        {
            isGuidedHelpEnabled: false,
            isHighContrastEnabled: false,
            isRTL: false,
            securityRolePrivileges: [],
            securityRoles: [],
            userId: "{00000000-0000-0000-0000-000000000000}",
            userName: "jdoe",
            languageId: this._userLcid
        });
    }
    
}
class XrmFormBuilder{
    _formType:XrmEnum.FormType = XrmEnum.FormType.Update;
    public AsCreateForm():XrmFormBuilder{
        this._formType = XrmEnum.FormType.Create;
        return this;
    }
    public build():FormSelectorMock{
        const itemMocks:ItemCollectionMock<FormItemMock> = new ItemCollectionMock<FormItemMock>([
            new FormItemMock({
                id: "form1",
                label: "Main Form",
                formType:this._formType,
                currentItem: true
            }),
        ]);
        return new FormSelectorMock(itemMocks);
    }
}