import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { totalPrice, cartItems } = location.state || {};

  const handlePayment = () => {
    const paymentData = {
      totalAmount: totalPrice,
      productId: cartItems.map((item) => item._id).join(", "),
    };

    fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "SUCCESS") {
          window.open(data.redirectURL, '_blank');
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
    <div>
      <Helmet>
        <title>Food Court | Payment</title>
      </Helmet>
      <div className="hero">
        <div className="mt-28">
          <button onClick={handlePayment} className="bg-green-700 text-white p-2 rounded-lg mx-auto text-center block mt-5 px-20 text-l">
            SSLCommerz Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
