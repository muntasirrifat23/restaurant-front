import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaTrashCan, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const Revenue = () => {
  const [payDetails, setPayDetails] = useState([]);

  useEffect(() => {
    fetch("https://restaurant-backend-pearl.vercel.app/paymentData")
      .then((res) => res.json())
      .then((data) => {
        setPayDetails(data);
      });
  }, []);

  // Total Amount
  const totalAmount = payDetails.filter((pay) => pay.status === "VALID").reduce((total, pay) => {
    return total + (Number(pay.amount) || 0);
  }, 0);

  // 30% Revenue
  const revenue = totalAmount * 0.3;

  // Delete Single
  const handlePayDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this payment details",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://restaurant-backend-pearl.vercel.app/paymentData/${id}`).then((res) => {
          //console.log("Delete request successful:", res.data);
          const updatedPay = payDetails.filter((pay) => pay._id !== id);
          setPayDetails(updatedPay);
        });
      }
    });
  };

  //Delete All
  const handlePayDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete all payment details",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("https://restaurant-backend-pearl.vercel.app/paymentData").then((res) => {
          //console.log("Delete request successful:", res.data);
          setPayDetails([]);
        });
      }
    });
  };

  return (
    <div className="grid">
      <Helmet>
        <title>Food Court | Revenue</title>
      </Helmet>

      <div className="mt-32 lg:flex gap-4 mx-8">
        <div className="stat bg-green-200 text-green-900 p-4 rounded-md flex items-center justify-center">
          <FaUsers className="text-3xl lg:text-5xl mr-3" />
          <div>
            <div className="stat-title text-black font-bold">
              <p>Total Money: </p>
            </div>
            <div className="stat-value">{totalAmount} TK</div>
          </div>
        </div>

        <div className="stat mt-4 lg:mt-0 bg-red-200 text-red-900 p-4 rounded-md flex items-center justify-center">
          <FaUsers className="text-3xl lg:text-5xl mr-3" />
          <div>
            <div className="stat-title text-black font-bold">
              <p>Revenue 30%: </p>
            </div>
            <div className="stat-value">{revenue} TK</div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="flex flex-col items-center justify-center mt-12">
        <div className="w-full max-w-8xl px-4 py-6">
          <div className="text-center mb-8">
            <p className="font-bold lg:text-4xl text-3xl text-green-800">
              User Payment Details
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-green-700 text-white text-lg">
                <tr>
                  <th className="py-2 px-4">Payment Method</th>
                  <th className="py-2 px-4">User Email</th>
                  <th className="py-2 px-4">Amount</th>
                  {/* <th className="py-2 px-4">Currency</th> */}
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {payDetails.map((pay) => (
                  <tr key={pay._id} className="text-center border-b">
                    <td className="py-2 px-4 font-semibold">{pay.payment_method}</td>
                    <td className="py-2 px-4 font-semibold">{pay.user_email}</td>
                    <td className="py-2 px-4 font-semibold">{pay.amount} {pay.currency}</td>
                    <td className="py-2 px-4 font-semibold">{pay.status}</td>
                    <td className="py-2 px-4 font-semibold">{pay.payment_date}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => handlePayDelete(pay._id)} className="btn btn-error btn-md" >
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Button */}
          <div className="text-center mt-4">
            <button
              onClick={handlePayDeleteAll}
              className="btn btn-success text-white text-center"
            >
              Delete All Payment Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
