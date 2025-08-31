import { useQuery } from "@tanstack/react-query";
import { usePowerAppsContext } from "../services/PowerAppsContextService";

export const useAppModulesQuery = ()=> {
    const powerAppsContext = usePowerAppsContext();
    // Queries
   return useQuery({ 
    queryKey: ['appmodules'], 
    queryFn: async() => {
        return await powerAppsContext.AppModuleService.getAppModules();
    } });

}