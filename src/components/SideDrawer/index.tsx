import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FireEventsInput from "../FireEventsInput";

export default function SideDrawer() {
  return (
    <div
      className="bg-white w-80 h-[100vh] fixed z-[1001] top-0 right-0 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-lg font-semibold p-2">Input Variable</div>
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
          <FireEventsInput />
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
      </Accordion>
    </div>
  );
}
