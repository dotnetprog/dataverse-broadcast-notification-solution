import MainModule from "@app/main";

describe("Given the root module",() => {
    describe("When it is loading",()=> {
        test("Then it should initialize window props",() => {
            expect((window as any).broadcast).toBeDefined();
        })
    })
})
describe("MainModule",() => {
    it("should have a form property defined",() =>{
        expect(MainModule.forms).toBeDefined();
    })
})