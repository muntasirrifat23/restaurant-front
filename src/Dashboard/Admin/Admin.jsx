import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaClipboardList, FaCommentDots, FaUsers, FaUtensils } from "react-icons/fa";
import PayDetails from "./PayDetails";
import Feedback from "./Feedback";
import ReserveAdmin from "./ReserveAdmin";

const Admin = () => {
  const [adminShow, setAdminShow] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/admin-home")
      .then((res) => res.json())
      .then((data) => {
        setAdminShow(data);
      });
  }, []);

  return (
    <div className="hero-content flex flex-col items-center justify-center min-h-screen max-w-8xl">
      <Helmet>
        <title>Food Court | Admin</title>
      </Helmet>
      <div className="w-full max-w-7xl mt-16">
        <p className="text-center font-bold text-4xl italic text-red-800 mb-4">
          Admin Home Page
        </p>

        {/* Stat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="stat bg-blue-200 text-blue-900 p-4 rounded-md flex items-center justify-center">
            <FaUsers className="text-3xl lg:text-5xl mr-3" />
            <div>
              <div className="stat-title text-black font-bold">Users</div>
              <div className="stat-value">{adminShow.users}</div>
            </div>
          </div>

          <div className="stat bg-green-200 text-green-900 p-4 rounded-md flex items-center justify-center">
            <FaUtensils className="text-3xl lg:text-5xl mr-3" />
            <div>
              <div className="stat-title text-black font-bold">Items</div>
              <div className="stat-value">{adminShow.items}</div>
            </div>
          </div>

          <div className="stat bg-yellow-200 text-yellow-900 p-4 rounded-md flex items-center justify-center">
            <FaClipboardList className="text-3xl lg:text-5xl mr-3" />
            <div>
              <div className="stat-title text-black font-bold">Reserve</div>
              <div className="stat-value">{adminShow.reserve}</div>
            </div>
          </div>

          <div className="stat bg-red-200 text-red-800 p-4 rounded-md flex items-center justify-center">
            <FaCommentDots className="text-3xl lg:text-5xl mr-3" />
            <div>
              <div className="stat-title text-black font-bold">Feedback</div>
              <div className="stat-value">{adminShow.feedback}</div>
            </div>
          </div>

          <div className="stat bg-pink-200 text-pink-800 p-4 rounded-md flex items-center justify-center">
            <FaCommentDots className="text-3xl lg:text-5xl mr-3" />
            <div>
              <div className="stat-title text-black font-bold">Payment</div>
              <div className="stat-value">{adminShow.payment}</div>
            </div>
          </div>

          <div className="stat bg-orange-200 text-orange-800 p-4 rounded-md flex items-center justify-center">
            <FaCommentDots className="text-3xl lg:text-5xl mr-3" />
            <div>
              <div className="stat-title text-black font-bold">Review</div>
              <div className="stat-value">{adminShow.review}</div>
            </div>
          </div>
        </div>

          <PayDetails></PayDetails>
          <ReserveAdmin></ReserveAdmin>
          <Feedback></Feedback>

      </div>
    </div>
  );
};

export default Admin;
