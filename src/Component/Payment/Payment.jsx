import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import Checkout from "./Checkout";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51PYQnu2MI2zfqDyLp5ilg5jdGc1lnyegjoR9HoipdwlvHcO1aMg5XQeBWHLmJtKCPKTGrxjCCklmSu6HrDrpOhOc006OoEe1fm');

const Payment = () => {
  return (
    <div>
      <Helmet>
        <title>Food Court | Payment</title>
      </Helmet>
      <div className="hero">
        <div className="mt-28">pay</div>
      </div>

      <Elements stripe={stripePromise}>
        <Checkout></Checkout>

      </Elements>
    </div>
  );
};

export default Payment;
