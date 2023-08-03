import { Card, CardContent } from "@mui/material";
import React from "react";

function InfoWindowCard({ data, PolygonName }) {
  return (
    <div>
      <h3>{PolygonName}</h3>
      <table>
        <thead>
          <tr>
            <th>Population</th>
            <th>Total Outlets</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data["population"]}</td>
            <td>{data["totalOutlets"]}</td>
            <td>{data["address"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InfoWindowCard;
