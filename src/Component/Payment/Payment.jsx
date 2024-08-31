import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const userEmail =user.email;
  console.log(userEmail)
  const location = useLocation();
  const { totalPrice, cartItems } = location.state || {};

  const handlePayment = () => {
    const paymentData = {
      totalAmount: totalPrice,
      productId: cartItems.map((item) => item._id).join(", "),
      userInfo: userEmail
    };

    fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: { "content-type" : "application/json" },
      body: JSON.stringify(paymentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "SUCCESS") {
          window.open(data.redirectURL, "_blank");
          console.log(paymentData);
        } else {
          Swal.fire("Payment Failed", data.message, "error");
        }
      })
      .catch((error) => {
        console.error("Payment error:", error);
        Swal.fire("Payment Error", "Something went wrong", "error");
      });
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
            <p>Confirm Your Payment</p>
            <hr className="border-red-800 mx-auto" style={{ width: "100%" }} />
          </p>
        </div>

        <button onClick={handlePayment} className="bg-green-700 text-white p-2 rounded-lg mx-auto text-center block px-20 text-xl w-full">
          Online Payment Method
        </button>

        <button className="text-green-700 border-green-700 border mt-5 bg-white p-2 rounded-lg mx-auto text-center block px-20 text-xl w-full font-bold">
        Cash Payment</button>
      </div>
    </div>
  );
};

export default Payment;
