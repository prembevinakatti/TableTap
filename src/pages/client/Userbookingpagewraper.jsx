// Import necessary modules
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import UserBookingPage from './Userbookingpage';
// Adjust the path as per your project structure

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt'); // Replace with your actual Stripe publishable key

function UserBookingPageWrapper() {
  const { slug } = useParams();

  return (
    <div className='h-[70vh] overflow-auto'>
      <Elements stripe={stripePromise}>
      <UserBookingPage slug={slug} />
    </Elements>
    </div>
  );
}

export default UserBookingPageWrapper;
