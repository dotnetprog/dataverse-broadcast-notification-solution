import * as React from "react"
import { PowerAppsContextProvider, PowerAppsContextService } from "./services/PowerAppsContextService";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppModulePickerComboBox } from "./components/AppModulePickerComboBox";
import { AppModule } from "./model/appmodule";
import { IInputs } from "./generated/ManifestTypes";

export type AppProps =  {
    context: ComponentFramework.Context<IInputs>
    onChange: (appmodule: AppModule) => void
};

export const App:React.FC<AppProps> = (props) => {
    const queryClient = new QueryClient();
    const service = new PowerAppsContextService(props.context);
    const currentAppModuleId = props.context.parameters.MainField.raw ?? undefined;
    return (
    <QueryClientProvider client={queryClient}> 
        <PowerAppsContextProvider Service={service}>
            <FluentProvider style={{width:'100%'}} theme={webLightTheme}>
                <AppModulePickerComboBox onChange={props.onChange} isReadOnly={service.isReadOnly} currentAppModuleId={currentAppModuleId} />
            </FluentProvider>
        </PowerAppsContextProvider>
    </QueryClientProvider>
   )
}