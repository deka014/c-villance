import React from "react";
import "./Map.css";
// import { Map as LeafletMap } from "leaflet";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from "./util";
// import "./Map.css";

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, center, zoom, casesType }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <ChangeMap center={center} zoom={zoom} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* loop through countries and draw circle on the screen */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
