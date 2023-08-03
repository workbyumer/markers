import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  PolygonF,
  HeatmapLayerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";
import { customerslist } from "../data/customerslist";
import Markers from "./Markers";
import { polyData } from "../data/ula_all";
import { multiheatMapData } from "../data/sec_density";
import HeatMap from "./heatMap";
import InfoWindowCard from "./infoWindowCard";
// const libraries = ["visualization"];
function Maps() {
  // const google = window.google.maps;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDiEmXC03SOnnqDfcfAZCrRpAut6YxWN2E",
    libraries: ["visualization"],
  });
  const containerStyle = {
    width: "98.75vw",
    height: "100vh",
  };
  const [map, setMap] = React.useState();
  const createPolygon = (polyCordinates) => {
    const PolygonCreated = new window.google.maps.Polygon({
      paths: polyCordinates,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
    PolygonCreated.setMap(map);
  };

  // const bermuda = () => {
  //   const triangleCoords = [
  //     { lat: 25.774, lng: -80.19 },
  //     { lat: 18.466, lng: -66.118 },
  //     { lat: 32.321, lng: -64.757 },
  //     { lat: 25.774, lng: -80.19 },
  //   ];
  //   const bermudaTriangle = new window.google.maps.Polygon({
  //     paths: triangleCoords,
  //     strokeColor: "#FF0000",
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: "#FF0000",
  //     fillOpacity: 0.35,
  //   });
  //   console.log(bermudaTriangle);
  //   bermudaTriangle.setMap(map);
  //   // console.log(map);
  // };
  const onLoad = React.useCallback(function callback(map) {
    // console.log(map);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    // setMap(null);
  }, []);
  const customerData = customerslist;
  const polygonData = polyData;
  const polyKey = Object.keys(polygonData["nairobi"]["locations"]);
  const heatKey = Object.keys(multiheatMapData);

  const MarkersData = customerslist["RB_nairobi_000"].map((m) => {
    return { lat: m.lat, lng: m.lng };
  });
  console.log(MarkersData);

  const keyArray = multiheatMapData[heatKey[0]].map((m) => m.coordinates);
  const [selectedPolygon, setSelectedPolygon] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const customerKey = Object.keys(customerData);
  const handlePolygonColor = (popu) => {
    if (popu < 71985) {
      return "#0ed145";
    } else if (popu < 143969) {
      return "#d1ad0e";
    } else if (popu < 215953) {
      return "#3f48cc";
    } else if (popu > 215952) {
      return "#d73131";
    }
  };
  const postionFormat = () => {
    let { lat, lng } =
      polyData["nairobi"]["locations"][selectedPolygon]?.["center"]?.[
        "marker"
      ]?.["position"];
    return new window.google.maps.LatLng(lat, lng);
  };
  const handleCordinates = (cord) => {
    const latLngArray = [];
    cord.forEach((coord) => {
      const latLng = new window.google.maps.LatLng(coord.lat, coord.lng);
      latLngArray.push(latLng);
    });
    return latLngArray;
  };
  // useEffect(() => {
  //   if (map) {
  //     bermuda();
  //   }
  // }, [map]);
  const handleSelectedPolygon = (polyName) => {
    setSelectedPolygon(polyName);
    console.log(
      polyData["nairobi"]["locations"][polyName]?.["center"]?.["marker"]?.[
        "position"
      ]
    );
  };
  const handleMarkerInfo = (customer) => {
    console.log(customer.lat, customer.lng);
    setSelectedCustomer(customer);
  };
  const handleHeatmapData = (region) => {
    const heatMapData = [];
    multiheatMapData[region].forEach((fe) => {
      const latLng = new window.google.maps.LatLng(
        fe.coordinates.lat,
        fe.coordinates.lng
      );
      heatMapData.push({ location: latLng, weight: fe.population });
    });
    return heatMapData;
  };

  return !isLoaded ? (
    <div>Please Wait...</div>
  ) : (
    <div>
      <GoogleMap
        // ref={}//
        options={{
          styles: [
            {
              stylers: [
                { saturation: -100 }, // Set saturation to -100 to remove color
                { gamma: 0.5 }, // Adjust gamma to control brightness
              ],
            },
          ],
        }}
        mapContainerStyle={containerStyle}
        center={{ lat: -1.24393006573456, lng: 36.9222280260109 }}
        //Setting Center
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {MarkersData.length > 0 && (
          <MarkerClustererF gridSize={10}>
            {(clusterer) =>
              MarkersData?.map((marker, index) => (
                <MarkerF position={marker} clusterer={clusterer} key={index} />
              ))
            }
          </MarkerClustererF>
        )}
        {/* <PolygonF
          path={polyData["nairobi"]["boundary"]["polygon"]}
          // onClick={()}
        />

        {polyKey.map((m) => {
          // Polygons
          const colors = handlePolygonColor(
            polyData["nairobi"]["locations"][m]["data"]["population"]
          );
          const newCordinates = handleCordinates(
            polyData["nairobi"]["locations"][m]["boundary"]["polygon"]
          );
          return (
            <PolygonF
              onClick={() => handleSelectedPolygon(m)}
              path={newCordinates}
              options={{
                fillColor: colors,
              }}
            />
          );
        })} */}
        {/* {selectedPolygon && (
          <InfoWindowF
            position={postionFormat()}
            onCloseClick={() => setSelectedPolygon(null)}
          >
            <InfoWindowCard
              data={polyData["nairobi"]["locations"][selectedPolygon]?.["data"]}
              PolygonName={selectedPolygon}
            ></InfoWindowCard>
          </InfoWindowF>
        )} */}
        {/* <HeatmapLayerF data={latLngArray || []} /> */}
        {/* {heatKey.map((m) => (
          <HeatMap dataHeat={m} />
        ))} */}
        {/* {heatKey.map((m) => {
          return <HeatmapLayerF data={handleHeatmapData(m)} />;
        })} */}
        {/* <MarkerClustererF
          averageCenter
          enableRetinaIcons
          gridSize={60}
        ></MarkerClustererF> */}

        {/* <HeatmapLayerF data={latLngArray || []} /> */}

        {/* {customerKey.map((m) => {
          return <Markers keyArray={m} />;
        })} */}
        {/* <MarkerClustererF gridSize={60}>
          {(clusterer) => {
            customerKey.map((m) => {
              return customerslist[m].map((markers) => {
                return (
                  <MarkerF
                    position={{
                      lat: markers.lat,
                      lng: markers.lng,
                    }}
                    clusterer={clusterer}
                    onClick={() => handleMarkerInfo(markers)}
                  >
                    {selectedCustomer === markers && (
                      <InfoWindowF
                        position={{
                          lat: markers.lat,
                          lng: markers.lng,
                        }}
                      >
                        <div>{markers["name"]}</div>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                );
              });
            });
          }}
        </MarkerClustererF> */}
      </GoogleMap>
    </div>
  );
}

export default Maps;
