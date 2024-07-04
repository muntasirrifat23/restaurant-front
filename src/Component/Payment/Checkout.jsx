import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(' ');
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "blue",
              "::placeholder": {
                color: "red",
              },
            },
            invalid: {
              color: "pink",
            },
          },
        }}
      ></CardElement>

      <button type="submit" disabled={!stripe} className="btn btn-primary">
        {" "}
        Pay
      </button>
      <p className="text-red-800">{error}</p>
    </form>
  );
};

export default Checkout;
