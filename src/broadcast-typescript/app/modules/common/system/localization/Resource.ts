export default class {


    private _cultures: { [key:number]:string}


    constructor(en: string, fr: string) {
        this._cultures = {  [1033]:en,[1036]:fr }
    }

    public toString(): string {
        const lcid = Xrm.Utility.getGlobalContext().userSettings.languageId;
        return this._cultures[lcid] || this._cultures[1033];
    }


}