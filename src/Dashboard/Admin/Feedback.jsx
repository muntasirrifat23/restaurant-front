import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const Feedback = () => {
  const [feedbackDetails, setFeedback] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/feedback')
      .then(res => res.json())
      .then(data => {
        setFeedback(data);
      });
  }, []);

  // Delete Single
  const handleFeedbackDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this payment details",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/feedback/${id}`).then((res) => {
          console.log("Delete request successful:", res.data);
          const updatedPay = feedbackDetails.filter((pay) => pay._id !== id);
          setFeedback(updatedPay);
        });
      }
    });
  };

  //Delete All
  const handleFeedbackDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete all payment details",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/feedback').then((res) => {
          console.log("Delete request successful:", res.data);
          setFeedback([]);
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-6">
      <div className="text-center mb-8">
          <p className="font-bold lg:text-4xl text-3xl text-red-800">
            User Feedback Details
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-red-800 text-white text-lg">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Message</th>
                <th className="py-2 px-4">Rating</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbackDetails.map(pay => (
                <tr key={pay._id} className="text-center border-b">
                  <td className="py-2 px-4 font-semibold">{pay.name}</td>
                  <td className="py-2 px-4 font-semibold">{pay.message}</td>
                  <td className="py-2 px-4 font-semibold">{pay.rating}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleFeedbackDelete(pay._id)} className="btn btn-error btn-md">
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
        <button onClick={handleFeedbackDeleteAll} className="btn btn-error text-white text-center">Delete All User Feedback</button>
        </div>

      </div>
    </div>
  );
};

export default Feedback;
