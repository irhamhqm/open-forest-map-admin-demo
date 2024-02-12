import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useGeomanControls } from "react-leaflet-geoman-v2";

export default function Drawing() {
  useGeomanControls({
    options: { drawText: true, drawCircle: true },
    onCreate: (e) => console.log("onCreate", e),
    eventDebugFn: console.log,
  });
  return null;
}
