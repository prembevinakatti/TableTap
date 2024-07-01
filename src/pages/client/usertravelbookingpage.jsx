import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import MapComponent from '../../components/Map/Map';
import profileService from '../../appwrite/profileservices';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt');

function UsertravelBookingPageWrapper() {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const { slug } = useParams();
  const [carprice, setcarprice] = useState(0);
  const [bikeprice, setbikeprice] = useState(0);
  const [to, setTo] = useState({});

  useEffect(() => {
    profileService.getpayment({ slug: slug }).then((data) => {
      const leta = JSON.parse(data.vehicaldetails);
      setbikeprice(leta.Car.costPerKm);
      setcarprice(leta.Bike.costPerKm);
      setTo({
        lng: leta.longitude,
        lat: leta.latitude,
      });
    });
  }, [slug]);

  return (
    <Elements stripe={stripePromise}>
      <MapComponent bike={bikeprice} car={carprice} />
    </Elements>
  );
}

export default UsertravelBookingPageWrapper;
