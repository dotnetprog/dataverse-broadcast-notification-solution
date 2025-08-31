import { AppModule } from "../model/appmodule";

export interface IAppModuleService {
  getAppModules(): Promise<AppModule[]>;
}

export class WebApiAppModuleService implements IAppModuleService {
    constructor(private webApi: ComponentFramework.WebApi) {}
    async getAppModules() {
        const Query = "?$select=appmoduleid,appmoduleidunique,name,uniquename";
        const result = await this.webApi.retrieveMultipleRecords("appmodule", Query);
        return result.entities as AppModule[];
    }
}