import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOneItemService } from "../services/item.services";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import ClickMarker from "../components/ClickMarker";
import DraggableMarker from "../components/DragableMarker"; // alternate flow. replace ClickMarker

function Create() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [center, setCenter] = useState([51.505, -0.09])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      name: name,
      coordinates: coordinates,
    };

    try {
      await createOneItemService(newItem);
      navigate("/item/list");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Form to Add Items</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleNameChange} />
        </div>

        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickMarker setCoordinates={setCoordinates} />

          {coordinates !== null && <Marker position={coordinates} />}

          {/* replaces flow of clicking on the map for a Marker that can be dragged */}
          {/* <DraggableMarker coordinates={coordinates || center} setCoordinates={setCoordinates}/> */}

        </MapContainer>

        <button>Add</button>
      </form>
    </div>
  );
}

export default Create;
