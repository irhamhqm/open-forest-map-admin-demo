import { Construction } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect } from "react";

const ShapeFileInput = ({
    activeTab,
    setEnableDrawingTools,
    setShowGeo,
    setAdministrativeAreaState
    }:{
    activeTab: number;
    setEnableDrawingTools: Dispatch<SetStateAction<boolean>>;
    setShowGeo: Dispatch<SetStateAction<boolean>>;
    setAdministrativeAreaState: Dispatch<SetStateAction<string[]>>
    }) => {

    useEffect(() => {
        setEnableDrawingTools(false);
        setShowGeo(false)
        setAdministrativeAreaState([""]);
    }, [activeTab]);

    return (
        <div className="bg-orange-500 text-lg font-medium p-4 mb-4 text-center">
            <Construction className="text-4xl"/>
            <div>
            This feature is still under construction
            </div>
        </div>
    );
};
export default ShapeFileInput