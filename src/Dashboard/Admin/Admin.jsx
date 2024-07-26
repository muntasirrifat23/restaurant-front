import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaClipboardList, FaCommentDots, FaUsers, FaUtensils } from "react-icons/fa";

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
    <div className="hero-content mx-auto text-center">
      <Helmet>
        <title>Food Court | Admin</title>
      </Helmet>
      <div className="mt-24">
        <p className="text-center font-bold text-4xl italic text-red-800 mb-4">
          Admin Home Page
        </p>

        {/* Stat */}
        <div className="stats text-sm lg:text-3xl gap-2">
          <div className="stat mr-5 bg-blue-200 text-blue-900 p-4 rounded-md flex items-center ">
            <FaUsers className="text-3xl lg:text-5xl "></FaUsers>
            <div>
              <div className="stat-title text-black font-bold">Users</div>
              <div className="stat-value ">{adminShow.users}</div>
            </div>
          </div>

          <div className="stat mr-5 bg-green-200 text-green-900 p-4 rounded-md flex items-center">
            <FaUtensils className="text-3xl lg:text-5xl "></FaUtensils>
            <div>
              <div className="stat-title text-black font-bold">Items</div>
              <div className="stat-value">{adminShow.items}</div>
            </div>
          </div>

          <div className="stat mr-5 bg-yellow-200 text-yellow-900 p-4 rounded-md flex items-center ">
            <FaClipboardList className="text-3xl lg:text-5xl "></FaClipboardList>
            <div>
              <div className="stat-title text-black font-bold">Reserve</div>
              <div className="stat-value">{adminShow.reserve}</div>
            </div>
          </div>

          <div className="stat mr-5 bg-red-200 text-red-800 p-4 rounded-md flex items-center">
            <FaCommentDots className="text-3xl lg:text-5xl"></FaCommentDots>
            <div>
              <div className="stat-title text-black font-bold">Feedback</div>
              <div className="stat-value">{adminShow.feedback}</div>
            </div>
          </div>
        </div>

      </div>
      </div>
       );
};

export default Admin;
