import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || ""; 
  const location = useLocation();
  const { totalPrice, cartItems } = location.state || {};
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!totalPrice || !cartItems?.length) {
      Swal.fire("Invalid Payment", "Cart items or total price is missing", "error");
      return;
    }

    const paymentData = {
      totalAmount: totalPrice,
      productId: cartItems.map((item) => item._id).join(", "),
      userInfo: userEmail,
    };

    try {
      setIsProcessing(true); 

      const response = await fetch("https://restaurant-backend-pearl.vercel.app/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.status === "SUCCESS") {
        window.open(data.redirectURL, "_blank");
        //console.log("Payment Data:", paymentData);
      } else {
        Swal.fire("Payment Failed", data.message, "error");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire("Payment Error", "Something went wrong", "error");
    } finally {
      setIsProcessing(false); 
    }
  };

  return (
    <div className="hero-content mx-auto">
      <Helmet>
        <title>Food Court | Payment</title>
      </Helmet>
      <div className="mt-24">
        <hr className="border-red-800 mx-auto" style={{ width: "100%" }} />
        <div className="w-50 text-center justify-center">
          <p className="text-center font-bold lg:text-5xl text-3xl italic text-red-800 mb-4">
            Confirm Your Payment
            <hr className="border-red-800 mx-auto" style={{ width: "100%" }} />
          </p>
        </div>

        <button
          onClick={handlePayment}
          className={`bg-green-700 text-white p-2 rounded-lg mx-auto text-center block px-20 text-xl w-full ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Online Payment Method"}
        </button>

        <button className="text-green-700 border-green-700 border mt-5 bg-white p-2 rounded-lg mx-auto text-center block px-20 text-xl w-full font-bold">
          Cash Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
