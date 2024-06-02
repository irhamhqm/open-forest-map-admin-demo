import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
  } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FireEvents from "./inputAtributesData/FireEvents";
import { PartialSilvanusGeoJson } from "../../../types";

const InputData = ({
    activeTab,
    administrativeAreaState,
    partialGeoJson
}:{
    activeTab: number;
    administrativeAreaState: string[];
    partialGeoJson: PartialSilvanusGeoJson | null;
}) => {

    return (
        <div className="mt-2">
            {/* FIRE EVENTS */}
            <Accordion
                slotProps={{ transition: { unmountOnExit: true } }}
                disableGutters
                sx={{ backgroundColor: '#ffcc00', color: '#000' }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <span className="text-base font-semibold">Fire Events</span>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white' }}>
                    <FireEvents 
                        administrativeAreaState={administrativeAreaState} 
                        activeTab={activeTab}
                        partialGeoJson={partialGeoJson}
                    />
                </AccordionDetails>
            </Accordion>

            {/* SOIL TYPE */}
            <Accordion
                slotProps={{ transition: { unmountOnExit: true } }}
                disableGutters
                sx={{ backgroundColor: '#ffcc00', color: '#000' }}
            >
                <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                    <span className="text-base font-semibold">Soil Type</span>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white' }}>
                    Input Soil Type
                </AccordionDetails>
            </Accordion>

            {/* REGULATION */}
            <Accordion
                slotProps={{ transition: { unmountOnExit: true } }}
                disableGutters
                sx={{ backgroundColor: '#ffcc00', color: '#000' }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <span className="text-base font-semibold">Regulation</span>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white' }}>
                    {activeTab !== 0 ? (
                        "This input is not available with the current location selection method."
                    ) : (
                        <>Input Regulation</>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* PROGRAMME */}
            <Accordion
                slotProps={{ transition: { unmountOnExit: true } }}
                disableGutters
                sx={{ backgroundColor: '#ffcc00', color: '#000' }}
            >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <span className="text-base font-semibold">
                Rehabilitation and Restoration Programs
              </span>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'white' }}>
              {activeTab !== 0 ? (
                "This input is not available with the current location selection method."
              ) : (
                <>Input Program</>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
    )
}

export default InputData