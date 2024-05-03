import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { Circle, Marker, Polygon, Rectangle } from "leaflet";
import { useGeomanControls } from "react-leaflet-geoman-v2";

export default function Drawing({
  onCreate,
}: {
  onCreate: ({
    type,
    coordinates,
  }: {
    type: string;
    coordinates: string;
  }) => void;
  activeTab: number;
}) {
  let layer: Element | undefined;

  useGeomanControls({
    options: {
      drawText: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawMarker: true,
    },
    onCreate: (e) => {
      if (e.shape === "Polygon") {
        if (layer) {
          // pass LatLng as string, easier to work with because the data returned from leaflet-geom
          // can vary
          layer.remove();
        }
        layer = (e.layer as Polygon).getElement();
        onCreate({
          coordinates: (e.layer as Polygon).getLatLngs().toString(),
          type: "Polygon",
        });
      } else if (e.shape === "Rectangle") {
        if (layer) {
          layer.remove();
        }
        layer = (e.layer as Rectangle).getElement();
        onCreate({
          coordinates: (e.layer as Rectangle).getLatLngs().toString(),
          type: "Rectangle",
        });
      } else if (e.shape === "Circle") {
        if (layer) {
          layer.remove();
        }
        layer = (e.layer as Circle).getElement();
        onCreate({
          coordinates: (e.layer as Circle).getLatLng().toString(),
          type: "Circle",
        });
      } else if (e.shape === "Marker") {
        if (layer) {
          layer.remove();
        }
        layer = (e.layer as Marker).getElement();
        onCreate({
          coordinates: (e.layer as Marker).getLatLng().toString(),
          type: "Circle",
        });
      }
    },
    onEdit: (e) => {
      if (e.shape === "Polygon") {
        onCreate({
          coordinates: (e.layer as Polygon).getLatLngs().toString(),
          type: "Polygon",
        });
      } else if (e.shape === "Rectangle") {
        onCreate({
          coordinates: (e.layer as Rectangle).getLatLngs().toString(),
          type: "Rectangle",
        });
      } else if (e.shape === "Circle") {
        onCreate({
          coordinates: (e.layer as Circle).getLatLng().toString(),
          type: "Circle",
        });
      }
    },
    // eventDebugFn: console.log,
  });
  return null;
}
