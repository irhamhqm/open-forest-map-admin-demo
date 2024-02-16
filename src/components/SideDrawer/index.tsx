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
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const containerClass = "mb-4";
const labelClass = "mb-2 text-[#212529]";
const selectInputClass =
  "border border-gray-400 mt-1 text-sm font-medium p-2 w-full";

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
  const [level0, setLevel0] = useState<string>("");
  const [level1, setLevel1] = useState<string>("");
  const [level2, setLevel2] = useState<string>("");
  const [level3, setLevel3] = useState<string>("");
  const arr: string[] = useMemo(() => [], []);

  const servicesLevel0 = useGetLocationServicesLevel0();
  const servicesLevel1 = useGetLocationServicesByLevel({
    level: 1,
    parent_id: Number(level0),
  });
  const servicesLevel2 = useGetLocationServicesByLevel({
    level: 2,
    parent_id: Number(level1),
  });
  const servicesLevel3 = useGetLocationServicesByLevel({
    level: 3,
    parent_id: Number(level2),
  });

  useEffect(() => {
    if (!level0) return;
    if (arr.length === 0) {
      arr.push(level0);
    } else if (arr.length >= 1) {
      if (arr.length > 1) {
        arr.forEach(() => {
          if (arr.length > 1) {
            arr.pop();
          }
        });
      }
      arr[0] = level0;
    }
    setSelectedLocation(arr[arr.length - 1]);
  }, [arr, level0, setSelectedLocation]);

  useEffect(() => {
    if (level1 === "none" && arr.length === 2) {
      arr.pop();
    } else if (arr.length === 1) {
      arr.push(level1);
    } else if (arr.length >= 2) {
      if (arr.length > 2) {
        arr.forEach(() => {
          if (arr.length >= 2) {
            arr.pop();
          }
        });
      }
      arr[1] = level1;
    }
    setSelectedLocation(arr[arr.length - 1]);
  }, [arr, level1, setSelectedLocation]);

  useEffect(() => {
    if (level2 === "none" && arr.length === 3) {
      arr.pop();
    } else if (arr.length === 2) {
      arr.push(level2);
    } else if (arr.length === 3) {
      if (arr.length > 3) {
        arr.forEach(() => {
          if (arr.length >= 3) {
            arr.pop();
          }
        });
      }
      arr[2] = level2;
    }
    setSelectedLocation(arr[arr.length - 1]);
  }, [arr, level2, setSelectedLocation]);

  useEffect(() => {
    if (level3 === "none" && arr.length === 4) {
      arr.pop();
    } else if (arr.length === 3) {
      arr.push(level3);
    } else if (arr.length === 4) {
      arr[3] = level3;
    }
    setSelectedLocation(arr[arr.length - 1]);
  }, [arr, level3, setSelectedLocation]);

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
                  value={level0}
                  onChange={setLevel0}
                />
                {!servicesLevel1.isPending &&
                  !servicesLevel1.isLoading &&
                  !servicesLevel1.isError &&
                  level1 !== "none" && (
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
                      value={level1}
                      onChange={setLevel1}
                    />
                  )}
                {!servicesLevel2.isPending &&
                  !servicesLevel2.isLoading &&
                  !servicesLevel2.isError &&
                  level2 !== "none" && (
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
                      value={level2}
                      onChange={setLevel2}
                    />
                  )}
                {!servicesLevel3.isPending &&
                  !servicesLevel3.isLoading &&
                  !servicesLevel3.isError &&
                  level3 !== "none" && (
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
                      value={level3}
                      onChange={setLevel3}
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
          {/* <Accordion
        slotProps={{ transition: { unmountOnExit: true } }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <span className="text-base font-semibold">Policy</span>
        </AccordionSummary>
        <AccordionDetails>
          <FireEventsInput />
        </AccordionDetails>
      </Accordion>
      <Accordion
        slotProps={{ transition: { unmountOnExit: true } }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <span className="text-base font-semibold">Programs</span>
        </AccordionSummary>
        <AccordionDetails>
          <FireEventsInput />
        </AccordionDetails>
      </Accordion>
      <Accordion
        slotProps={{ transition: { unmountOnExit: true } }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <span className="text-base font-semibold">Soil Type</span>
        </AccordionSummary>
        <AccordionDetails>
          <FireEventsInput />
        </AccordionDetails>
      </Accordion> */}
        </>
      )}
    </div>
  );
}
