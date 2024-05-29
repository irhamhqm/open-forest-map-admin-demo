import { Dispatch, SetStateAction, useEffect } from "react";

const DrawInput = ({
    activeTab,
    setEnableDrawingTools,
    setShowGeo,
    setAdministrativeAreaState
    }:{
    activeTab: number;
    setEnableDrawingTools: Dispatch<SetStateAction<boolean>>
    setShowGeo: Dispatch<SetStateAction<boolean>>
    setAdministrativeAreaState: Dispatch<SetStateAction<string[]>>
}   ) => {

    useEffect(() => {
        setEnableDrawingTools(true);
        setShowGeo(false);
        setAdministrativeAreaState([""]);
    }, [activeTab]);

    return (
        <div className="bg-green-500 text-sm font-medium p-4 mb-4 text-center">
            Use the drawing tools on the left of the map.
        </div>
    );
};

export default DrawInput;