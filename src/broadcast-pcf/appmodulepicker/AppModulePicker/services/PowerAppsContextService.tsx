import { IInputs } from "../generated/ManifestTypes";
import { IAppModuleService, WebApiAppModuleService } from "./AppModuleService";
import * as React from "react";
import { createContext, ReactNode, useContext } from "react";

export class PowerAppsContextService {
    context: ComponentFramework.Context<IInputs>;
    AppModuleService:IAppModuleService;
    isReadOnly:boolean;
    constructor(context: ComponentFramework.Context<IInputs>)
 {
        this.context =context;
        this.AppModuleService = new WebApiAppModuleService(this.context.webAPI);
        this.isReadOnly = context.mode.isControlDisabled || !context.parameters.MainField.security?.editable;
    }
}
const PowerAppsContext = createContext<PowerAppsContextService>(undefined!);
interface PowerAppsContextProviderProps {
    Service:PowerAppsContextService,
    children: ReactNode
 }
 export const PowerAppsContextProvider = ({ Service, children }: PowerAppsContextProviderProps) => {
    return (
       <PowerAppsContext.Provider value={Service}>
         {children}
       </PowerAppsContext.Provider>
    )
  }
  export const usePowerAppsContext = () => {
    return useContext(PowerAppsContext);
  }