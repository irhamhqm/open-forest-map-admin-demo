import React, {Dispatch, SetStateAction, useState} from 'react';
import SideDrawer from './SideDrawer';
import { PartialSilvanusGeoJson } from '../../../types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  // activeTab: number;
  setEnableDrawingTools: Dispatch<SetStateAction<boolean>>;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  setShowGeo: Dispatch<SetStateAction<boolean>>;
  partialGeoJson: PartialSilvanusGeoJson | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, 
    toggleSidebar, 
    setEnableDrawingTools, 
    setSelectedLocation,
    setShowGeo,
    partialGeoJson
    }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-96' : 'w-16'} overflow-y-auto `}>
      <button onClick={toggleSidebar} className="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      <nav className={`mt-10 ${isOpen ? 'block' : 'hidden'}`}>
        <SideDrawer 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setEnableDrawingTools={setEnableDrawingTools}
          setSelectedLocation={setSelectedLocation}
          setShowGeo={setShowGeo}
          partialGeoJson={partialGeoJson}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
