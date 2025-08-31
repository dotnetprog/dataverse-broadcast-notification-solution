import * as React from "react";
import { AppModule } from "../model/appmodule";
import {
  Combobox,
  makeStyles,
  Option,
  OptionOnSelectData,
  SelectionEvents,
  Spinner,
  useId,
} from "@fluentui/react-components";
import { useAppModulesQuery } from "../hooks";
import { ErrorMessageBar } from "./ErrorMessage";

const useStyles = makeStyles({
  comboBox: {
    // Stack the label above the field with a gap
    width: "100%",
  },
});
export interface AppModulePickerComboBoxProps {
    currentAppModuleId?: string;
    onChange: (appmodule: AppModule) => void
    isReadOnly?: boolean;
}

export const AppModulePickerComboBox:React.FC<AppModulePickerComboBoxProps> = (props:AppModulePickerComboBoxProps) => {
    const { data: appmodules, isLoading, isError, error } = useAppModulesQuery();
    const [selectedAppModuleId, setSelectedAppModuleId] = React.useState<string | undefined>(props.currentAppModuleId);
    const comboboxId = useId("combobox");
    if(isLoading) return <Spinner label="Loading application modules..." />;
    if(isError){
      return <ErrorMessageBar error={error} title="Error loading application modules" defaultMessage="An error occurred while loading application modules." />;
    }

    const currentAppModule = appmodules?.find(a => a.appmoduleid === selectedAppModuleId);
    const onOptionSelect = (event: SelectionEvents, data: OptionOnSelectData) => {
      const appModule = appmodules.find(a => a.appmoduleid === data.optionValue)!;
      setSelectedAppModuleId(appModule.appmoduleid);
      props.onChange(appModule);
    };
    const style = useStyles();
    return (
      <Combobox
        clearable
        className={style.comboBox}
        aria-labelledby={comboboxId}
        placeholder="Select an application"
        onOptionSelect={onOptionSelect}
        selectedOptions= {currentAppModule ?[currentAppModule.appmoduleid] : []}
        value={currentAppModule ?`${currentAppModule.name} (${currentAppModule.uniquename})`:undefined}
        disabled={props.isReadOnly}
      >
        {appmodules.map((appmodule) => {
          const displayText = `${appmodule.name} (${appmodule.uniquename})`;
          return <Option key={appmodule.appmoduleid} value={appmodule.appmoduleid}>{displayText}</Option>;
        })}
      </Combobox>

  );

}