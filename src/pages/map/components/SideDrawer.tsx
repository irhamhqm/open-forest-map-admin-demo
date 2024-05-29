import { Tabs, Tab, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import TabPanel from "./TabPanel";
import AdministrativeInput from "./inputLocation/AdministrativeInput";
import DrawInput from "./inputLocation/DrawInput";
import InputData from "./InputData";
import ShapeFileInput from "./inputLocation/ShapeFileInput";

const SideDrawer = ({
        activeTab, 
        setActiveTab,
        setEnableDrawingTools,
        setSelectedLocation,
        setShowGeo
        }:{
        activeTab: number;
        setActiveTab: Dispatch<SetStateAction<number>>;
        setEnableDrawingTools: Dispatch<SetStateAction<boolean>>;
        setSelectedLocation: Dispatch<SetStateAction<string>>;
        setShowGeo: Dispatch<SetStateAction<boolean>>;
        }) => {

    const [administrativeAreaState, setAdministrativeAreaState] = useState<string[]>([]);

    return (
        <div className="bg-gray-800 w-full mt-16 h-screen">
            <div className="text-lg font-semibold mt-4 px-4">
                Input Data
                <div className="mt-4 ml-0">
                    <div className="text-sm">
                        Location
                    </div>
                    <Tabs
                        value={activeTab}
                        onChange={(_, value) => setActiveTab(value)}
                    >
                        <Tab
                            label="Administrative"
                            style={{ color: 'orange' }}
                            value={0}
                         />
                        <Tab
                            label="Draw"
                            style={{ color: 'orange' }}
                            value={1}
                        />
                        <Tab
                            label="Shape File"
                            style={{ color: 'orange' }}
                            value={2}
                        />
                    </Tabs>
                    <TabPanel value={activeTab} index={0}>
                        <AdministrativeInput 
                            activeTab={activeTab} 
                            setEnableDrawingTools={setEnableDrawingTools} 
                            setSelectedLocation={setSelectedLocation} 
                            setShowGeo={setShowGeo}
                            setAdministrativeAreaState={setAdministrativeAreaState}
                        />
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        <DrawInput 
                            activeTab={activeTab} 
                            setEnableDrawingTools={setEnableDrawingTools}
                            setShowGeo={setShowGeo}
                            setAdministrativeAreaState={setAdministrativeAreaState}
                        />
                    </TabPanel>
                    <TabPanel value={activeTab} index={2}>
                        <ShapeFileInput 
                            activeTab={activeTab} 
                            setEnableDrawingTools={setEnableDrawingTools}
                            setShowGeo={setShowGeo}
                            setAdministrativeAreaState={setAdministrativeAreaState}
                        />
                    </TabPanel>
                </div>

                <div className="ml-0">
                    <div className="text-sm">
                        Attribute
                    </div>
                    <InputData 
                        activeTab={activeTab}
                        administrativeAreaState={administrativeAreaState}
                    />
                </div>
            </div>
        </div>   
    )
}

export default SideDrawer