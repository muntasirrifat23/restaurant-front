import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const PayDetails = () => {
  const [payDetails, setPayDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/paymentData')
      .then(res => res.json())
      .then(data => {
        setPayDetails(data);
      });
  }, []);

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
        axios.delete(`http://localhost:5000/paymentData/${id}`).then((res) => {
          console.log("Delete request successful:", res.data);
          const updatedPay = payDetails.filter((pay) => pay._id !== id);
          setPayDetails(updatedPay);
        });
      }
    });
  };

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
        axios.delete('http://localhost:5000/paymentData').then((res) => {
          console.log("Delete request successful:", res.data);
          setPayDetails([]);
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-7xl px-4 py-6">
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
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Currency</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {payDetails.map(pay => (
                <tr key={pay._id} className="text-center border-b">
                  <td className="py-2 px-4 font-semibold">{pay.payment_method}</td>
                  <td className="py-2 px-4 font-semibold">{pay.amount}</td>
                  <td className="py-2 px-4 font-semibold">{pay.currency}</td>
                  <td className="py-2 px-4 font-semibold">{pay.status}</td>
                  <td className="py-2 px-4 font-semibold">{pay.payment_date}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => handlePayDelete(pay._id)} className="btn btn-error btn-md">
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
        <button onClick={handlePayDeleteAll} className="btn btn-success text-white text-center">Delete All Payment Details</button>
        </div>

      </div>
    </div>
  );
};

export default PayDetails;
