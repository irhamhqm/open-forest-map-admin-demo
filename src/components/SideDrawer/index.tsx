import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FireEvents from "../FireEvents";
import CustomTabPanel from "../CustomTabPanel";
import FormSelectInput from "../common/form/SelectInput";
import {
  useGetLocationServicesByLevel,
  useGetLocationServicesLevel0,
} from "../../hooks/api";
import { Dispatch, SetStateAction, useEffect, useReducer } from "react";
import SoilType from "../SoilType";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const selectInputClass =
  "border border-gray-400 mt-1 text-sm font-medium p-2 w-full";

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
  }
  return state;
}

export default function SideDrawer({
  activeTab,
  setActiveTab,
  setSelectedLocation,
  loading,
}: {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  loading: boolean;
}) {
  const [state, dispatch] = useReducer(reducer, [""]);

  const servicesLevel0 = useGetLocationServicesLevel0();
  const servicesLevel1 = useGetLocationServicesByLevel({
    level: 1,
    parent_id: Number(state[0]),
  });
  const servicesLevel2 = useGetLocationServicesByLevel({
    level: 2,
    parent_id: Number(state[1]),
  });
  const servicesLevel3 = useGetLocationServicesByLevel({
    level: 3,
    parent_id: Number(state[2]),
  });

  useEffect(() => {
    setSelectedLocation(state[state.length - 1]);
  }, [state, setSelectedLocation]);

  return (
    <div className="bg-white w-80 h-[100vh] fixed z-[1001] top-0 right-0 overflow-y-auto">
      <div className="text-lg font-semibold mt-4 px-4">Input Data</div>
      {loading ? (
        <img src={"/spinner.svg"} />
      ) : (
        <>
          <div className="mt-4">
            <span className="mb-2 text-[#212529] px-4">Location</span>
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
            >
              <Tab
                label="Draw"
                value={0}
              />
              <Tab
                label="Administrative"
                value={1}
              />
            </Tabs>
            <CustomTabPanel
              value={activeTab}
              index={0}
            >
              <div className="bg-green-500 text-sm font-medium p-4 mb-4 text-center">
                Use the drawing tools on the left.
              </div>
            </CustomTabPanel>
            <CustomTabPanel
              value={activeTab}
              index={1}
            >
              <div className="p-4">
                <FormSelectInput
                  htmlFor="level0"
                  name="level0"
                  label="Administration Level 0"
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
                  onChange={(value) => dispatch({ type: "level0", value })}
                />
                {!servicesLevel1.isPending &&
                  !servicesLevel1.isLoading &&
                  !servicesLevel1.isError &&
                  state[1] !== "none" && (
                    <FormSelectInput
                      htmlFor="level1"
                      name="level1"
                      label="Administration Level 1"
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
                      onChange={(value) => dispatch({ type: "level1", value })}
                    />
                  )}
                {!servicesLevel2.isPending &&
                  !servicesLevel2.isLoading &&
                  !servicesLevel2.isError &&
                  state[2] !== "none" && (
                    <FormSelectInput
                      htmlFor="level2"
                      name="level2"
                      label="Administration Level 2"
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
                      onChange={(value) => dispatch({ type: "level2", value })}
                    />
                  )}
                {!servicesLevel3.isPending &&
                  !servicesLevel3.isLoading &&
                  !servicesLevel3.isError &&
                  state[3] !== "none" && (
                    <FormSelectInput
                      htmlFor="level3"
                      name="level3"
                      label="Administration Level 3"
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
                      onChange={(value) => dispatch({ type: "level3", value })}
                    />
                  )}
              </div>
            </CustomTabPanel>
          </div>
          <Accordion
            slotProps={{ transition: { unmountOnExit: true } }}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <span className="text-base font-semibold">Fire Events</span>
            </AccordionSummary>
            <AccordionDetails>
              <FireEvents />
            </AccordionDetails>
          </Accordion>
          <Accordion
            slotProps={{ transition: { unmountOnExit: true } }}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <span className="text-base font-semibold">Soil Type</span>
            </AccordionSummary>
            <AccordionDetails>
              <SoilType />
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
}
