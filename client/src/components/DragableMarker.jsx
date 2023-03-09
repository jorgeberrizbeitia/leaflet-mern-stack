
import { Marker } from "react-leaflet";

function DraggableMarker({ coordinates, setCoordinates }) {
  const handleDragEnd = (event) => {
    console.log(event)
    const newCoordinates = [
      event.target._latlng.lat.toFixed(5), // latitude (reduced to 5 decimals for simplicity)
      event.target._latlng.lng.toFixed(5), // longitude (reduced to 5 decimals for simplicity)
    ];
    console.log(newCoordinates);
    setCoordinates(newCoordinates);
  };

  // eventHandlers accepts an object with the types of events to listen to (click, drag, dragend, etc...)

  return (
    <Marker
      draggable={true}
      position={coordinates}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    />
  );
}

export default DraggableMarker;