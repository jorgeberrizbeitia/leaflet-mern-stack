# LEAFLET SETUP FOR MERN STACK

[React Leaflet](https://react-leaflet.js.org/) is a Frontend Library for displaying maps and markers through coordinates. Most of the setup is done on the Frontend.

***

# BACKEND SETUP.

- The only thing required in the backend is to add a property to the documents where you want to store a location. This array property will store two numeric values used for determining a location: `latitude` and `longitude`. So the property should be structured like below inside the document Schema.

```javascript
coordinates: [Number]; // this array will hold only two numeric values: [latitude, longitude]
```

- When creating a new document, the frontend (supported by the leaflet package) will pass the values needed for the coordinates. So aside fron this change, the structure in the backend will be the same as for doing CRUD on any other type of document.

***

# FRONTEND SETUP.

# 1. Installation

- npm install leaflet react-leaflet

All the components needed will come from `react-leaflet`. From `leaflet` we may need to use a couple of methods.

***

# 2. Initial Setup

- Go to public/index.html and link the leaflet css file from leaflet.com (https://leafletjs.com/examples/quick-start/)

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
  integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
  crossorigin=""
/>
```

- Add a style to your base style file to give the leaflet size a proper size

```css
/* this is the class used for a map container in leaflet. If not done, the map will have no size and be invisible */
.leaflet-container {
  height: 400px; /* example */
  width: 400px; /* example */
}
```
***

# 2. Implementation.

The code below will give you a basic example of rendering a Map, the process of storing coordinates used to Create a Document and the process of displaying a Map with several Documents (each with their coordinates).

**NOTE:** If you want more information of each component, check the last section that explains each one, as well as their properties, or follow the official documentation at [react-leaflet](https://react-leaflet.js.org/)

## 2.1. Rendering a Map

- Go to the component where you have the form to create a new document and add the following code either inside or outside the form.

```jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for Leaflet Component imports

// ...

const [ center, setCenter ] = useState([51.505, -0.09]) // state used to define the center of the map on first render. [51.505, -0.09] is just an example.

// ...

<MapContainer center={center} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {/* invoke Marker Componentes here */}

</MapContainer>;
```

## 2.2. Storing Coordinates used to Create a new Document.

- Create a state called `clickedPosition` where the coordinates of the new document will be stored.

```jsx
const [clickedPosition, setClickedPosition] = useState(null);
```

- Next, create a component called `ClickMarker` that will receives as prop: `setClickedPosition` to update the state with the coordinates whenever the user clicks on the map.

```jsx
import { useMapEvents } from "react-leaflet/hooks";

function ClickMarker({ setClickedPosition }) {
  useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      const obj = event.latlng;
      setClickedPosition([obj.lat.toFixed(5), obj.lng.toFixed(5)]);
    },
  });
  return null;
}

export default ClickMarker;
```

- In the component where `<MapContainer>` is, invoke `<ClickMarker>` inside `<MapContainer>`, right after the `<TileLayer />` invocation and pass `setClickedPosition`.

```jsx
<ClickMarker setClickedPosition={setClickedPosition} />
```

- Click on the map, it all works correctly, you should see the coordinates in the console, as per the `console.log` in `<ClickMarker>`.

- After the `<ClickMarker>` invocation, add the following code to render a Leaflet `<Marker>` component with the coordinates stored in the state `clickedPosition`.

```jsx
{ clickedPosition !== null && <Marker position={clickedPosition} /> }
```

- Follow the regular Document Creation process in the form, using the value in `clickedPosition` as the coordinates for the document.

NOTE: this flow is for a Marker that appears when the map is cliked. For a different flow with a Marker that can be dragged, see the code in the repository.

## 2.3. Displaying Several Documents in a Map.

- Go to the component where you are listing all Documents that have coordinates and add a basic map, similar to the steps above.

```jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for Leaflet Component imports

// ...

const [ center, setCenter ] = useState([51.505, -0.09]) // this can be set to be one of the document coordinates with setCenter

// ...

<MapContainer center={center} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {/* invoke Marker Componentes here */}

</MapContainer>;
```

- Follow a regular process of calling the backend for several Documents (including their `coordinates` property), then, add the `.map()` you would normally use to display all documents, but do it inside the `<MapContainer>` as below. For each document, render a `<Marker>`with the coordinates and a `<Popup>` component for the rest of the document data.

```jsx
{
  listOfDocuments.map((eachElement) => {
    return (
      <Marker position={eachElement.coordinates}>
        <Popup>
          {/* Example of the rest of the document data*/}
          <p>Name: <b>{eachElement.name}</b></p>
        </Popup>
      </Marker>
    );
  })
}
```

- Similar to above, you can display a map for the details of a single Document.

- You can modify the `center` property of the `<MapContainer>` to be the value of the first document in the list (if any exist), that way the map will always have some markers showing.

***

# EXTRA. Component Explanation

## `<MapContainer/>...<MapContainer>`

### Description

- REQUIRED. The first component that creates the map

### How to import?

```javascript
import { MapContainer } from "react-leaflet";
```

### Properties:

- (REQUIRED) center: should have an `array` of two `numbers` `[latitude, longitud]`
- (REQUIRED) zoom: should have a `number` that represents initial zoom value
- (OPTIONAL) scrollWheelZoom: should have a `boolean` to allow zoom on mouse

***

## `<TileLayer/>...<TileLayer>`

### Description

- REQUIRED. Added inside `MapContainer`. The component that links to the openstreetmap info.

### How to import?

```javascript
import { TileLayer } from "react-leaflet";
```

- IMPORTANT. below line is required as it is. Should be inside `MapContainer`

```jsx
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
```

### Properties:

- (REQUIRED) attribution: should have the following value: `'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'`
- (REQUIRED) url: should have the following value: `"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"`

***

## `<Marker/>...<Marker>`

### Description

- OPTIONAL. Added inside `MapContainer`. This component shows a marker on the map.
- If showing multiple pins, we should iterate over the array of data and show a Marker for each element.

### How to import?

```javascript
import { Marker } from "react-leaflet";
```

### Properties:

- (REQUIRED) position: should have an `array` of two `numbers` `[latitude, longitud]`
- (OPTIONAL) eventHandlers: accepts an object with the types of events to listen to (click, drag, dragend, etc...). As value, the function to be invoked in each event type.

***

## `<Popup/>...<Popup>`

### Description

- OPTIONAL. Added inside `Marker`. This component shows a modal with information of the marker. The information shown is all jsx inside the component.

### How to import?

```javascript
import { Popup } from "react-leaflet";
```

### For more info on components see [Leaflet Component Documentation](https://react-leaflet.js.org/docs/api-components/)