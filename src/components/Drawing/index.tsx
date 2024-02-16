import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { Circle, Polygon, Rectangle } from "leaflet";
import { Dispatch, SetStateAction } from "react";
import { useGeomanControls } from "react-leaflet-geoman-v2";

export default function Drawing({
  onCreate,
}: {
  onCreate: Dispatch<SetStateAction<string>>;
  activeTab: number;
}) {
  let layer: Element | undefined;

  useGeomanControls({
    options: {
      drawText: false,
      drawCircle: true,
      drawCircleMarker: false,
      drawPolyline: false,
      drawMarker: false,
    },
    onCreate: (e) => {
      // console.log("onCreate", e);
      if (e.shape === "Polygon") {
        if (layer) {
          onCreate((e.layer as Polygon).getLatLngs().toString());
          layer.remove();
        }
        layer = (e.layer as Polygon).getElement();
        onCreate((e.layer as Polygon).getLatLngs().toString());
      } else if (e.shape === "Rectangle") {
        if (layer) {
          onCreate((e.layer as Rectangle).getLatLngs().toString());
          layer.remove();
        }
        layer = (e.layer as Rectangle).getElement();
        onCreate((e.layer as Rectangle).getLatLngs().toString());
      } else if (e.shape === "Circle") {
        if (layer) {
          onCreate((e.layer as Circle).getLatLng().toString());
          layer.remove();
        }
        layer = (e.layer as Circle).getElement();
        onCreate((e.layer as Circle).getLatLng().toString());
      }
    },
    onEdit: (e) => {
      // console.log("onEdit", e);
      if (e.shape === "Polygon") {
        onCreate((e.layer as Polygon).getLatLngs().toString());
      } else if (e.shape === "Rectangle") {
        onCreate((e.layer as Rectangle).getLatLngs().toString());
      } else if (e.shape === "Circle") {
        onCreate((e.layer as Circle).getLatLng().toString());
      }
    },
    // eventDebugFn: console.log,
  });
  return null;
}
