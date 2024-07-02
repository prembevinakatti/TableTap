import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import InputBox from "../InputBox/InputBox";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import profileService from "../../appwrite/profileservices";
import { ID } from "appwrite";
import toast from "react-hot-toast";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt");

const MapComponent = ({ from, to, bike, car ,resid,userid}) => {
  const [distance, setDistance] = useState("");
  const [transportMode, setTransportMode] = useState("bike"); // Default to bike
  const [numPersons, setNumPersons] = useState(1); // Default to 1 person
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [newReservation, setNewReservation] = useState({});
  const date=Date.now()
  
  useEffect(() => {
    setPaymentAmount(calculateTotalAmount());
  }, [transportMode, numPersons]);

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

  const handleToken = async (token) => {
    console.log("Stripe Token:", token);
    const paymentdetails={
      distance:distance,
      transportMode:transportMode,
      numPersons:numPersons
    }
    profileService.createtravelpayments({amount:JSON.stringify(paymentAmount),isvehicalbooked:true,resid:resid,userid:userid,userlogitude:to.lng,userlatitude:to.lat,paymentdetails:JSON.stringify(paymentdetails),slug:ID.unique(),date:JSON.stringify(date),dateonbook:""})
    toast.success("Payment Successful!");
  };

  const Routing = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      if (!from || !to || from.lat === 0 || from.lng === 0 || to.lat === 0 || to.lng === 0) {
        console.error("Invalid coordinates for routing:", { from, to });
        return;
      }

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
        .on("routingerror", function (e) {
          console.error("Routing error:", e);
        })
        .addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }, [map, from, to]);

    return null;
  };

  return (
    <div className="h-[70vh] overflow-auto">
      <MapContainer
        center={[from.lat, from.lng]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[from.lat, from.lng]}>
          <Popup>Starting Point</Popup>
        </Marker>
        <Marker position={[to.lat, to.lng]}>
          <Popup>Destination</Popup>
        </Marker>
        <Routing from={from} to={to} />
      </MapContainer>
      <h2 className="text-2xl my-3">Distance: {distance}</h2>

      <div className="w-full h-[40vh] flex items-center justify-center">
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
              info="w-full"
              placeholder="Number Of Persons"
              value={numPersons}
              onChange={handleNumPersonsChange}
            />
            <InputBox type="text" info="w-full" placeholder="Contact Number" />
            <p>Amount Per Person: {transportMode === "bike" ? bike : car}</p>
            <p className="w-full text-center border p-2 bg-primary text-secondary rounded-md text-2xl">
              Total Bill: {calculateTotalAmount()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="my-10 flex flex-col items-center">
        <Elements stripe={stripePromise}>
          <StripeCheckout
            stripeKey="pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt"
            token={handleToken}
            amount={paymentAmount * 100}
            currency="USD"
            billingAddress={true}
            zipCode={false}
          >
            <button
              type="button"
              className="p-2 mt-4 bg-blue-500 text-white rounded-md"
              disabled={!stripePromise}
            >
              Pay ${paymentAmount}
            </button>
          </StripeCheckout>
        </Elements>
      </div>
    </div>
  );
};

export default MapComponent;
