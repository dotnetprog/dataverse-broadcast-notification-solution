import {XrmMockGenerator } from "xrm-mock";
export const xrmMock = XrmMockGenerator.initialise();

const runtimeXrmEnum = (globalThis as any).XrmEnum ?? {
        FormType: {
            Undefined: 0,
            Create: 1,
            Update: 2,
            ReadOnly: 3,
            Disabled: 4,
            QuickCreate: 5,
            BulkEdit: 6,
            ReadOptimized: 11
        }
    };
    (globalThis as any).XrmEnum = runtimeXrmEnum;

