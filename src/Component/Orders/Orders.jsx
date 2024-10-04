import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [payDetails, setPayDetails] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/paymentData?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const validPayments = data.filter(
            (payment) => payment.status === "VALID"
          );
          setPayDetails(validPayments);
        });
    }
  }, [user]);

  return (
    <div className="grid">
      <Helmet>
        <title>Food Court | Orders</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center mt-24">
        <div className="w-full max-w-8xl px-4 py-6">
          <div className=" mb-8">
            <p className="font-bold lg:text-4xl text-3xl text-green-800">
              Past Orders:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-green-700 text-white text-lg">
                <tr>
                  <th className="py-2 px-4">Payment Method</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {payDetails
                  .filter((pay) => pay.user_email === user.email) // Filter for the logged-in user's email
                  .map((pay) => (
                    <tr key={pay._id} className="text-center border-b">
                      <td className="py-2 px-4 font-semibold">
                        {pay.payment_method}
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        {pay.user_email}
                      </td>{" "}
                      <td className="py-2 px-4 font-semibold">
                        {pay.amount} {pay.currency}
                      </td>
                      <td className="py-2 px-4 font-semibold">{pay.status}</td>
                      <td className="py-2 px-4 font-semibold">
                        {pay.payment_date}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
