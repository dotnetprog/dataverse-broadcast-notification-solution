import { XrmTestDriver } from "@tests/XrmTestDriver";
import { OptionSetAttributeMock, SectionMock, StringAttributeMock, TabMock, XrmMockGenerator, XrmStaticMock } from "xrm-mock";
import { forms } from "@app/modules/form";
import { fdn_actiontype } from "@app/modules/domain";

describe("Given a broadcast app notification Form", () => {
    let xrmMock:XrmStaticMock;
    let actionTabMock:TabMock;
    let urlSectionMock:SectionMock;
    let ActionTypeAttributeMock: OptionSetAttributeMock;
    let ButtonDisplayTextAttributeMock: StringAttributeMock;
    let ButtonActionUrlAttributeMock: StringAttributeMock;
    beforeEach(() => {
        xrmMock = new XrmTestDriver().ConfigureForm(f => f.AsCreateForm()).build();
        actionTabMock = XrmMockGenerator.Tab.createTab('tab_action');
        urlSectionMock = XrmMockGenerator.Section.createSection("tab_action_section_url","Url",true,actionTabMock);
        ActionTypeAttributeMock = XrmMockGenerator.Attribute.createOptionSet("fdn_actiontype",undefined,[{text:"Web Link",value:fdn_actiontype.WebLink}]);
        ButtonDisplayTextAttributeMock = XrmMockGenerator.Attribute.createString("fdn_buttondefaulttext");
        ButtonActionUrlAttributeMock = XrmMockGenerator.Attribute.createString("fdn_buttonactionurl");
    });
    describe("When it loads with no actiontype", () => {
        beforeEach(() => {
            forms.fdn_broadcastappnotification.onLoad(XrmMockGenerator.getEventContext() as any);
        });
        it("should add an onChange handler to the action type field", () => {
            expect(ActionTypeAttributeMock.eventHandlers).toHaveLength(1);
        });
        it("should hide url section", () => {
             expect(urlSectionMock.getVisible()).toBeFalsy();
        });
    });
    describe("When it loads with WebLink actiontype", () => {
        beforeEach(() => {
            ActionTypeAttributeMock.setValue(fdn_actiontype.WebLink);
            forms.fdn_broadcastappnotification.onLoad(XrmMockGenerator.getEventContext() as any);
        });
        it("should add an onChange handler to the action type field", () => {
            expect(ActionTypeAttributeMock.eventHandlers).toHaveLength(1);
        });
        it("should display url section", () => {
             expect(urlSectionMock.getVisible()).toBeTruthy();
        });
        it("should set button display text field required", () => {
             expect(ButtonDisplayTextAttributeMock.getRequiredLevel()).toBe("required");
        });
        it("should set button action url field required", () => {
             expect(ButtonActionUrlAttributeMock.getRequiredLevel()).toBe("required");
        })
    });
    describe("When action type changes to WebLink", () => {
        beforeEach(() => {
            ActionTypeAttributeMock.setValue(fdn_actiontype.WebLink);
            forms.fdn_broadcastappnotification.onActionTypeChange(XrmMockGenerator.getEventContext() as any);
        });
         it("should display url section", () => {
             expect(urlSectionMock.getVisible()).toBeTruthy();
        });
        it("should set button display text field required", () => {
             expect(ButtonDisplayTextAttributeMock.getRequiredLevel()).toBe("required");
        });
        it("should set button action url field required", () => {
             expect(ButtonActionUrlAttributeMock.getRequiredLevel()).toBe("required");
        })
    });
    describe("When action type changes to none", () => {
        beforeEach(() => {
            ActionTypeAttributeMock.setValue(null as any);
            forms.fdn_broadcastappnotification.onActionTypeChange(XrmMockGenerator.getEventContext() as any);
        });
         it("should hide url section", () => {
             expect(urlSectionMock.getVisible()).toBeFalsy();
        });
        it("should set button display text field required", () => {
             expect(ButtonDisplayTextAttributeMock.getRequiredLevel()).toBe("none");
        });
        it("should set button action url field required", () => {
             expect(ButtonActionUrlAttributeMock.getRequiredLevel()).toBe("none");
        })
    });
});
