import { MockInstance } from "vitest";

export function simpleRetrieveMultipleMock<T>(data:T[]):MockInstance<typeof Xrm.WebApi.retrieveMultipleRecords>{
    const retrieveMultipleSpy = vitest.spyOn(Xrm.WebApi,"retrieveMultipleRecords");
    const result:Xrm.RetrieveMultipleResult = {
        entities:data,
        nextLink:''
    };
    retrieveMultipleSpy.mockResolvedValue(result);
    return retrieveMultipleSpy;
}