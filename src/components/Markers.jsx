import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { customerslist } from "../data/customerslist";
import React from "react";

function Markers({ keyArray }) {
  let showed = customerslist[keyArray].map((m) => {
    return (
      <MarkerF
        position={{
          lat: m.lat,
          lng: m.lng,
        }}
      />
    );
  });
  return showed;
}

export default Markers;
