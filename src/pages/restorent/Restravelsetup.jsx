import React, { useState } from 'react';
import profileService from '../../appwrite/profileservices';
import { useSelector } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt"
);

const ResTravelSetup = () => {
  const [hasVehicles, setHasVehicles] = useState(null);
  const [hasBike, setHasBike] = useState(null);
  const [hasCar, setHasCar] = useState(null);
  const profiledata = useSelector((state) => state.profile.profiledata);
  const [vehicleData, setVehicleData] = useState({
    Bike: { name: 'Bike', costPerKm: '', seats: 1 },
    Car: { name: 'Car', costPerKm: '', seats: 4 },
  });

  const handleHasVehiclesChange = (e) => {
    setHasVehicles(e.target.value === 'yes');
    if (e.target.value === 'no') {
      setHasBike(null);
      setHasCar(null);
    }
  };

  const handleHasBikeChange = (e) => {
    setHasBike(e.target.value === 'yes');
  };

  const handleHasCarChange = (e) => {
    setHasCar(e.target.value === 'yes');
  };

  const handleVehicleChange = (type, field, value) => {
    const newVehicleData = { ...vehicleData };
    newVehicleData[type][field] = value;
    setVehicleData(newVehicleData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const providedVehicles = {
      Bike: hasBike ? vehicleData.Bike : null,
      Car: hasCar ? vehicleData.Car : null,
    };

    profileService.updatevehicaldetails({
      slug: profiledata.$id,
      vehicaldetails: JSON.stringify(providedVehicles),
      canprovidevehical: hasVehicles === "yes" ? true : false
    }).then(() => {
      console.log("updated the vehical details");
    });
  };

  const handleToken = async (token) => {
    console.log("Stripe Token:", token);
    // Here you can make a request to your server to create a payment intent
    // and complete the payment using the received token.

    alert("Payment Successful!");
  };

  const calculatePayment = () => {
    let totalPayment = 0;
    if (hasBike) {
      totalPayment += parseFloat(vehicleData.Bike.costPerKm) * 10; // Example calculation
    }
    if (hasCar) {
      totalPayment += parseFloat(vehicleData.Car.costPerKm) * 10; // Example calculation
    }
    return totalPayment;
  };

  return (
    <div>
      <h1>Travel Setup</h1>

      <div>
        <label>
          Do you have vehicles?
          <select onChange={handleHasVehiclesChange} style={{ marginLeft: '10px' }}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
      </div>

      {hasVehicles && (
        <div>
          <div style={{ marginTop: '10px' }}>
            <label>
              Do you have a Bike?
              <select onChange={handleHasBikeChange} style={{ marginLeft: '10px' }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          {hasBike && (
            <div style={{ marginBottom: '10px' }}>
              <h2>Bike Details</h2>
              <input
                type="number"
                placeholder="Cost per KM"
                value={vehicleData.Bike.costPerKm}
                onChange={(e) => handleVehicleChange('Bike', 'costPerKm', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <input
                type="number"
                placeholder="Seats"
                value={vehicleData.Bike.seats}
                readOnly
                style={{ marginRight: '10px' }}
              />
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <label>
              Do you have a Car?
              <select onChange={handleHasCarChange} style={{ marginLeft: '10px' }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>

          {hasCar && (
            <div style={{ marginBottom: '10px' }}>
              <h2>Car Details</h2>
              <input
                type="number"
                placeholder="Cost per KM"
                value={vehicleData.Car.costPerKm}
                onChange={(e) => handleVehicleChange('Car', 'costPerKm', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <input
                type="number"
                placeholder="Seats"
                value={vehicleData.Car.seats}
                readOnly
                style={{ marginRight: '10px' }}
              />
            </div>
          )}

          {(hasBike || hasCar) && (
            <form onSubmit={handleSubmit}>
              <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
            </form>
          )}

          <div className="my-10 flex flex-col items-center">
            <div >
              <div>
                <h3 className="text-lg font-semibold">
                  Total Payment: ${calculatePayment()}
                </h3>
              </div>
            </div>
            <div className="mb-10">
              <Elements stripe={stripePromise}>
                <StripeCheckout
                  stripeKey="pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt"
                  token={handleToken}
                  amount={calculatePayment() * 100}
                  currency="USD"
                  billingAddress={true}
                  zipCode={false}
                >
                  <button
                    type="button"
                    className="p-2 mt-4 bg-blue-500 text-white rounded-md"
                  >
                    Pay ${calculatePayment()}
                  </button>
                </StripeCheckout>
              </Elements>
            </div>
          </div>

        </div>
      )}

      {hasVehicles === false && (
        <div>
          <p>You cannot proceed without providing vehicles.</p>
        </div>
      )}
    </div>
  );
};

export default ResTravelSetup;
