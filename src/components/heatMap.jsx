import React from "react";
import { multiheatMapData } from "../data/sec_density";
import { HeatmapLayerF } from "@react-google-maps/api";

function HeatMap({ dataHeat }) {
  const google = window.google;
  // Create an array to store google.maps.LatLng objects
  const latLngArray = [];

  // Sample data containing latitude and longitude values

  // Loop through your data and create LatLng objects
  multiheatMapData[dataHeat].forEach((coord) => {
    const latLng = new google.maps.LatLng(
      coord.coordinates.lat,
      coord.coordinates.lng
    );

    latLngArray.push(latLng);
  });
  console.log(latLngArray);

  // Now latLngArray contains an array of google.maps.LatLng objects
  return <HeatmapLayerF data={latLngArray || []} />;
}

export default HeatMap;
