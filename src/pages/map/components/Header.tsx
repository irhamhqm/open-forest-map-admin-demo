import store from "store2";
import { useLocation, useNavigate } from "react-router-dom";


interface HeaderProps {
    pilotData: {
        centroid: {
            lat: number;
            lon: number;
        };
        pilot_geom: string;
        pilot_id: number | null;
        pilot_name: string;
    } | undefined;
    setDrawerOpen: (updater: (prev: boolean) => boolean) => void;
    drawerOpen: boolean;
  }

const Header: React.FC<HeaderProps> = ({pilotData, setDrawerOpen, drawerOpen}) => {
    const navigate = useNavigate();

    return (
        <div className="flex w-full bg-gray-800 py-4">
            <div className="container mx-auto px-4 flex">
                <p className="text-white md:text-xl font-semibold mt-2">
                    Hello, {store.get("user_data").user_display_name},{" Pilot "}
                    {pilotData?.pilot_name || "Super admin"}
                </p>

                <button className="md:text-lg text-xs md:ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded-md transition duration-300 ease-in-out"
                    onClick={() => {
                        store.clear();
                        navigate("/");
                    }}
                    >
                    Sign Out
                </button>

                <button
                    className="md:text-lg text-xs md:ml-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 rounded-md transition duration-300 ease-in-out"
                    onClick={() => navigate("/data")}
                    >
                    View Data
                </button>


                <button
                    onClick={() => setDrawerOpen((prev) => !prev)}
                    className="md:text-lg text-xs md:ml-4 bg-green-500 hover:bg-green-600 text-white font-bold px-4 rounded-md transition duration-300 ease-in-out py-2"
                    >
                    {drawerOpen ? "Close" : "Input Data"}
                </button>
            </div> 
        </div>
    )
}

export default Header;