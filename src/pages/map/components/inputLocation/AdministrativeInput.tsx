import FormSelectInput from "../../../../components/common/form/SelectInput";
import { useGetLocationServicesLevel0, useGetLocationServicesByLevel, } from "../../../../hooks/api";
import { useReducer, useEffect, Dispatch, SetStateAction } from "react";

function reducer(state: string[], action: { type: string; value: string }) {
  switch (action.type) {
    case "level0":
      return [action.value];
    case "level1":
      if (action.value === "") return [state[0]];
      return [state[0], action.value];
    case "level2":
      if (action.value === "") return [state[0], state[1]];
      return [state[0], state[1], action.value];
    case "level3":
      if (action.value === "") return [state[0], state[1], state[2]];
      return [state[0], state[1], state[2], action.value];
    case "level4":
      if (action.value === "") return [state[0], state[1], state[2], state[3]];
      return [state[0], state[1], state[2], state[3], action.value];
    case "level5":
      if (action.value === "")
        return [state[0], state[1], state[2], state[3], state[4]];
      return [state[0], state[1], state[2], state[3], state[4], action.value];
    case "clear":
      return [""];
  }
  return state;
}

const AdministrativeInput = ({
    activeTab,
    setEnableDrawingTools,
    setSelectedLocation,
    setShowGeo,
    setAdministrativeAreaState
    }:{
    activeTab: number;
    setEnableDrawingTools: Dispatch<SetStateAction<boolean>>;
    setSelectedLocation: Dispatch<SetStateAction<string>>;
    setShowGeo: Dispatch<SetStateAction<boolean>>
    setAdministrativeAreaState: Dispatch<SetStateAction<string[]>>
    }) => { 
    const [state, dispatch] = useReducer(reducer, [""]);
    
    const servicesLevel0 = useGetLocationServicesLevel0();
    const servicesLevel1 = useGetLocationServicesByLevel({
        level: 1,
        parent_code: state[0],
      });
    const servicesLevel2 = useGetLocationServicesByLevel({
        level: 2,
        parent_code: state[1],
      });
    const servicesLevel3 = useGetLocationServicesByLevel({
        level: 3,
        parent_code: state[2],
      });
    // const servicesLevel4 = useGetLocationServicesByLevel({
    //     level: 4,
    //     parent_code: state[3],
    //   });
    // const servicesLevel5 = useGetLocationServicesByLevel({
    //     level: 5,
    //     parent_code: state[4],
    //   });
    const containerClass = "mb-4"
    const labelClass = "mb-2 white"
    const selectInputClass = "border border-gray-400 mt-1 text-lg font-medium p-2 w-full"


    useEffect(() => {
      if (activeTab !== 0) {
        dispatch({ type: "clear", value: "" });
      }
      setEnableDrawingTools(false)
      setShowGeo(true)
    }, [activeTab]);

    useEffect(() => {
      setSelectedLocation(state[state.length - 1]);
      setAdministrativeAreaState(state);
    }, [state, setSelectedLocation]);


    return (
        <div>
            <div className="py-4 px-0">
                <FormSelectInput
                  htmlFor="level0"
                  name="level0"
                  label="Administration Level 0 (Country)"
                  containerClass={containerClass}
                  labelClass={labelClass}
                  inputClass={selectInputClass}
                  disabled={
                    servicesLevel0.isPending ||
                    servicesLevel0.isLoading ||
                    servicesLevel0.isError
                  }
                  data={servicesLevel0.data || []}
                  value={state[0]}
                  onChange={(value) => 
                    {
                      dispatch({ type: "level0", value });
                    }}
                />
                {!servicesLevel1.isPending &&
                  !servicesLevel1.isLoading &&
                  !servicesLevel1.isError &&
                  state[1] !== "none" && (
                    <FormSelectInput
                      htmlFor="level1"
                      name="level1"
                      label="Administration Level 1 (Province)"
                      containerClass={containerClass}
                      labelClass={labelClass}
                      inputClass={selectInputClass}
                      disabled={
                        servicesLevel1.isPending ||
                        servicesLevel1.isLoading ||
                        servicesLevel1.isError
                      }
                      data={servicesLevel1.data || []}
                      value={state[1]}
                      onChange={(value) => {
                        dispatch({ type: "level1", value });
                      }}
                    />
                )}
                {!servicesLevel2.isPending &&
                  !servicesLevel2.isLoading &&
                  !servicesLevel2.isError &&
                  state[2] !== "none" && (
                    <FormSelectInput
                      htmlFor="level2"
                      name="level2"
                      label="Administration Level 2 (City / Regency)"
                      containerClass={containerClass}
                      labelClass={labelClass}
                      inputClass={selectInputClass}
                      disabled={
                        servicesLevel2.isPending ||
                        servicesLevel2.isLoading ||
                        servicesLevel2.isError
                      }
                      data={servicesLevel2.data || []}
                      value={state[2]}
                      onChange={(value) => {
                        dispatch({ type: "level2", value });
                      }}
                    />
                )}
                {!servicesLevel3.isPending &&
                  !servicesLevel3.isLoading &&
                  !servicesLevel3.isError &&
                  state[3] !== "none" && (
                    <FormSelectInput
                      htmlFor="level3"
                      name="level3"
                      label="Administration Level 3 (Sub-district)"
                      containerClass={containerClass}
                      labelClass={labelClass}
                      inputClass={selectInputClass}
                      disabled={
                        servicesLevel3.isPending ||
                        servicesLevel3.isLoading ||
                        servicesLevel3.isError
                      }
                      data={servicesLevel3.data || []}
                      value={state[3]}
                      onChange={(value) => {
                        dispatch({ type: "level3", value });
                      }}
                    />
                )}
                {/* {!servicesLevel4.isPending &&
                  !servicesLevel4.isLoading &&
                  !servicesLevel4.isError &&
                  state[4] !== "none" && (
                    <FormSelectInput
                      htmlFor="level4"
                      name="level4"
                      label="Administration Level 4"
                      containerClass={containerClass}
                      labelClass={labelClass}
                      inputClass={selectInputClass}
                      disabled={
                        servicesLevel4.isPending ||
                        servicesLevel4.isLoading ||
                        servicesLevel4.isError
                      }
                      data={servicesLevel4.data || []}
                      value={state[4]}
                      onChange={(value) => dispatch({ type: "level4", value })}
                    />
                  )}
                {!servicesLevel5.isPending &&
                  !servicesLevel5.isLoading &&
                  !servicesLevel5.isError &&
                  state[5] !== "none" && (
                    <FormSelectInput
                      htmlFor="level5"
                      name="level5"
                      label="Administration Level 5"
                      containerClass={containerClass}
                      labelClass={labelClass}
                      inputClass={selectInputClass}
                      disabled={
                        servicesLevel5.isPending ||
                        servicesLevel5.isLoading ||
                        servicesLevel5.isError
                      }
                      data={servicesLevel5.data || []}
                      value={state[5]}
                      onChange={(value) => dispatch({ type: "level5", value })}
                    />
                  )} */}
            </div>
        </div>
    )
}

export default AdministrativeInput