import store from "store2";
import { useGetPilotDetails } from "../../hooks/api/pilot";
import { NavLink } from "react-router-dom";

export default function DataNavbar() {
  const userData = store.get("user_data");
  // const navigate = useNavigate();

  const { data: pilotData, isLoading: pilotLoading } = useGetPilotDetails(
    userData?.pilot_id
  );

  if (pilotLoading) return <></>;

  return (
    <div className="flex w-full p-4 h-16 bg-white gap-2 shadow-md">
      <div>
        Hello, {store.get("user_data").user_display_name},{" Pilot "}
        {pilotData?.pilot_name}
      </div>
      {/* <button
          className="ml-auto border border-solid border-gray-600 p-1"
          onClick={() => navigate("/data")}
        >
          View Data
        </button> */}
      {/* <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="ml-2 border border-solid border-gray-600 p-1"
        >
          {drawerOpen ? "Close" : "Input Data"}
        </button> */}
      <NavLink
        to="/map"
        style={{ marginLeft: "auto", textDecoration: "underline" }}
      >
        Map
      </NavLink>
      <NavLink
        to="/data"
        style={{ textDecoration: "underline" }}
      >
        Fire Event
      </NavLink>
      <NavLink
        to="/data/soil-type"
        style={{ textDecoration: "underline" }}
      >
        Soil Type
      </NavLink>
      <NavLink
        to="/data/regulation"
        style={{ textDecoration: "underline" }}
      >
        Regulation
      </NavLink>
      <NavLink
        to="/data/program"
        style={{ textDecoration: "underline" }}
      >
        Programme
      </NavLink>
    </div>
  );
}
