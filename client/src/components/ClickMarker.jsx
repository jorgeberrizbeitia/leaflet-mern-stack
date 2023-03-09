import { useMapEvents } from "react-leaflet/hooks";

// Component used to record coordinates when user clicks on the map
function ClickMarker({ setCoordinates }) {
  useMapEvents({
    click: (event) => {
      const coordinates = [
        event.latlng.lat.toFixed(5), // latitude (reduced to 5 decimals for simplicity)
        event.latlng.lng.toFixed(5), // longitude (reduced to 5 decimals for simplicity)
      ];
      console.log(coordinates);
      setCoordinates(coordinates);
    },
  });
  return null;
}

export default ClickMarker;
