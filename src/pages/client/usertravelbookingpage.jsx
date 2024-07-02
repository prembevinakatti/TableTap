import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MapComponent from '../../components/Map/Map';
import profileService from '../../appwrite/profileservices';

const stripePromise = loadStripe('pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt');

function UsertravelBookingPageWrapper() {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const { slug } = useParams();
  const [carprice, setCarPrice] = useState(0);
  const [bikeprice, setBikePrice] = useState(0);
  const [to, setTo] = useState(null);

  const from = { lat: profiledata.latitude, lng: profiledata.longitude}; 

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const data = await profileService.getres({ slug });
        const vehicleDetails = JSON.parse(data.vehicaldetails);
        setBikePrice(vehicleDetails.Bike.costPerKm);
        setCarPrice(vehicleDetails.Car.costPerKm);
        setTo({
          lat: data.latitude,
          lng: data.longitude,
        });
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [slug]);

  return (
    <Elements stripe={stripePromise}>
      {to && <MapComponent from={from} to={to} bike={bikeprice} car={carprice} resid={slug} userid={profiledata.$id}/>}
    </Elements>
  );
}

export default UsertravelBookingPageWrapper;
