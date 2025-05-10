import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const location = useLocation();
  const { campId, price, campName } = location.state || {};

  return (
    <div>
      <div className="mt-4 mb-10">
        <h2>
          <span className="font-bold">Event:</span> {campName}
        </h2>
        <h2 className="mt-2">
          <span className="font-bold">Amount:</span> {price}
        </h2>
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
