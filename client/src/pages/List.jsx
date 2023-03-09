import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItemsService } from "../services/item.services";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function List() {
  const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllItemsService();
      setAllItems(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>... loading</h3>;
  }

  return (
    <div>
      <h1>List of Items</h1>
      {/* ! MAP HERE */}
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* invoke Marker Componentes here */}
        {allItems.map((eachElement) => {
          return (
            <Marker key={eachElement._id} position={eachElement.coordinates}>
              <Popup>
                <p>
                  Name: <b>{eachElement.name}</b>
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ;
    </div>
  );
}

export default List;
