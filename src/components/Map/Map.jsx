import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import InputBox from "../InputBox/InputBox";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import profileService from "../../appwrite/profileservices";
import { ID } from "appwrite";

const Routing = ({ from, to, setDistance, bike, car }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      createMarker: () => null, // Disable routing markers
      show: false, // Hide the routing instruction bar
    })
      .on("routesfound", function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        setDistance((summary.totalDistance / 1000).toFixed(2) + " km");
      })
      .addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, from, to, setDistance]);

  return null;
};

const handleToken = async (token) => {
  console.log("Stripe Token:", token);

 
  profileService.createtravelpayments({
    amount: JSON.stringify(calculateTotalAmount()),
    resid: "example_resid",
    userid: "example_userid",
    istraveled: true,
    slug: ID.unique(),
    userlatitude: JSON.stringify(to.lat),
    userlongitude: JSON.stringify(to.lng),
  }).then(() => {
    // Example of navigation after payment
    navigate("userhomepage");
  });

  alert("Payment Successful!");
};

const MapComponent = ({ bike, car }) => {
  const [distance, setDistance] = useState("");
  const [transportMode, setTransportMode] = useState("bike"); // Default to bike
  const [numPersons, setNumPersons] = useState(1); // Default to 1 person

  const handleTransportModeChange = (mode) => {
    setTransportMode(mode);
  };

  const handleNumPersonsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumPersons(value);
  };

  // Calculate total amount based on transport mode and number of persons
  const calculateTotalAmount = () => {
    let amountPerPerson = transportMode === "bike" ? bike : car;
    let totalAmount = amountPerPerson * numPersons;
    return totalAmount;
  };

  return (
    <div className="h-[80vh] overflow-auto">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[37.7749, -122.4194]}>
          <Popup>San Francisco</Popup>
        </Marker>
        <Marker position={[38.5816, -121.4944]}>
          <Popup>Los Angeles</Popup>
        </Marker>
        <Routing
          from={{ lat: 37.7749, lng: -122.4194 }}
          to={{ lat: 38.5816, lng: -121.4944 }}
          setDistance={setDistance}
          bike={bike}
          car={car}
        />
      </MapContainer>
      <h2 className="text-2xl my-3">Distance: {distance}</h2>

      <div className="w-full h-[40vh]  flex items-center justify-center">
        <div>
          <p className="text-3xl">Choose Mode Of Transport</p>
          <div className="flex items-center justify-center gap-10">
            <div className="flex items-center m-3 gap-5">
              <input
                type="radio"
                id="bike"
                className="radio radio-warning"
                name="transportMode"
                checked={transportMode === "bike"}
                onChange={() => handleTransportModeChange("bike")}
              />
              <label htmlFor="bike" className="text-2xl">
                Bike
              </label>
            </div>
            <div className="flex items-center m-3 gap-5">
              <input
                type="radio"
                id="cab"
                name="transportMode"
                className="radio radio-warning"
                checked={transportMode === "cab"}
                onChange={() => handleTransportModeChange("cab")}
              />
              <label htmlFor="cab" className="text-2xl">
                Cab
              </label>
            </div>
          </div>

          <div className="TransportDetails flex flex-col gap-3 w-full h-fit p-5 ">
            <InputBox
              type="number"
              placeholder="Number Of Persons"
              value={numPersons}
              onChange={handleNumPersonsChange}
            />
            <InputBox type="text" placeholder="Contact Number" />
            <p>Amount Per Person: {transportMode === "bike" ? 100 : 200}</p>
            <p className="w-full text-center border p-2 bg-primary text-secondary rounded-md text-2xl">
              Total Amount: {calculateTotalAmount()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
