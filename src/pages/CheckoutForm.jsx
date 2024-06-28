import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ paymentAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Received Stripe PaymentMethod:', paymentMethod);
      // Handle the payment confirmation
      handlePaymentConfirmation(paymentMethod.id);
    }
  };

  const handlePaymentConfirmation = async (paymentMethodId) => {
    const paymentIntent = await stripe.confirmCardPayment(
      "sk_test_51PT4pOAM7tB5pG0Hfe0bSHOLAVKlGwchTm9NawLiIXXKSU7cx0NCVMyNYyxll57JZkWALMOy1M7VfsAzHn1msAPs001yUnbLMC", // Replace this with your actual client secret obtained from Stripe API
      {
        payment_method: paymentMethodId,
      }
    );

    if (paymentIntent.error) {
      console.error('Payment confirmation error:', paymentIntent.error);
    } else if (paymentIntent.paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${paymentAmount}
      </button>
    </form>
  );
};

export default CheckoutForm;
