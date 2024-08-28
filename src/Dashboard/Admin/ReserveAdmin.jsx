import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ReserveAdmin = () => {
  const [reserveDetails, setReserveAdmin] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reserve')
      .then(res => res.json())
      .then(data => {
        setReserveAdmin(data);
      });
  }, []);

  const handlePayDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this reserve details",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/reserve/${id}`).then((res) => {
          console.log("Delete request successful:", res.data);
          const updatedPay = reserveDetails.filter((reserve) => reserve._id !== id);
          setReserveAdmin(updatedPay);
        });
      }
    });
  };

  const handlePayDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete all reserve details",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/reserve').then((res) => {
          console.log("Delete request successful:", res.data);
          setReserveAdmin([]);
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-6">
        <div className="text-center mb-8">
          <p className="font-bold lg:text-4xl text-3xl text-green-800">
            User Reserve Details
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-green-700 text-white text-lg">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Seat</th>
                <th className="py-2 px-4">Note</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {reserveDetails.map(reserve => (
                <tr key={reserve._id} className="text-center border-b">
                  <td className="py-2 px-4 font-semibold">{reserve.name}</td>
                  <td className="py-2 px-4 font-semibold">{reserve.phone}</td>
                  <td className="py-2 px-4 font-semibold">{reserve.email}</td>
                  <td className="py-2 px-4 font-semibold">{reserve.date}</td>
                  <td className="py-2 px-4 font-semibold">{reserve.time}</td>
                  <td className="py-2 px-4 font-semibold">{reserve.seat}</td>
                  <td className="py-2 px-4 font-semibold">{reserve.note}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => handlePayDelete(reserve._id)} className="btn btn-error btn-md">
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
        <button onClick={handlePayDeleteAll} className="btn btn-success text-white text-center">Delete All Reserve Details</button>
        </div>

      </div>
    </div>
  );
};

export default ReserveAdmin;
