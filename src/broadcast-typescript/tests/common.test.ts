import common from "@app/modules/common/";
describe("Common Module",() => {
    it("should have a system submodule",() =>{
        expect(common.system).toBeDefined();
    });
    it("should have a utility submodule",() =>{
        expect(common.utility).toBeDefined();
    });
})