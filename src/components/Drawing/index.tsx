import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { LatLng, Marker, Polygon, Icon  } from "leaflet";
import { useGeomanControls } from "react-leaflet-geoman-v2";
import * as turf from "@turf/turf";

const customFireIcon = new Icon({
  iconUrl: '/Fire.png',
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


export default function Drawing({onCreate}: {onCreate: ({type, coordinates, area}: {
    type: string;
    coordinates: LatLng | LatLng[] | LatLng[][] | LatLng[][][];
    area: string;
  }) => void;
}) {
  let layer: Element | undefined;

  useGeomanControls({
    options: {
      // position: "topright",
      drawMarker: true,
      drawPolygon: true,
      drawPolyline: false,
      drawRectangle: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawText: false
    },
    onCreate: (e) => {
      // POLYGON
      if (e.shape === "Polygon") {
        if (layer) {
          layer.remove();
        }
        
        layer = (e.layer as Polygon).setStyle({ color: "red" }).getElement();
        
        const markedArea = (e.layer as Polygon);
        const markedAreaGeoJSON = markedArea.toGeoJSON();
        const area = (turf.area(markedAreaGeoJSON)/1000000).toFixed(2);

        onCreate({
          coordinates: (e.layer as Polygon).getLatLngs(),
          type: "Polygon",
          area: area,
        });
      } 
      
      // MARKER
      if (e.shape === "Marker") {
        if (layer) {
          layer.remove();
        }
        layer = (e.layer as Marker).setIcon(customFireIcon).getElement();
        onCreate({
          coordinates: (e.layer as Marker).getLatLng(),
          type: "Point",
          area: "0.00",
        });
      }
    },
    onEdit: (e) => {
      if (e.shape === "Polygon") {
        layer = (e.layer as Polygon).setStyle({ color: "red" }).getElement();
        
        const markedArea = (e.layer as Polygon);
        const markedAreaGeoJSON = markedArea.toGeoJSON();
        const area = (turf.area(markedAreaGeoJSON)/1000000).toFixed(2);

        onCreate({
          coordinates: (e.layer as Polygon).getLatLngs(),
          type: "Polygon",
          area: area,
        });
      } 
      
      // MARKER
      if (e.shape === "Marker") {
        layer = (e.layer as Marker).setIcon(customFireIcon).getElement();
        onCreate({
          coordinates: (e.layer as Marker).getLatLng(),
          type: "Point",
          area: "0.00",
        });
      }
    },
    onLayerRemove: () => {
      onCreate({ type: "", coordinates: [], area: "0.00" });
    },
  });
  return null;
}
