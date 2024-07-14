import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Admin = () => {
  const [items, showItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        showItems(data);
      });
  });

  return (
    <div className="hero-content  mx-auto">
      <Helmet>
        <title>Food Court | Admin</title>
      </Helmet>
      <div className="mt-24">
        <div className="text-center font-bold text-4xl italic text-red-800 mb-4">
          Admin Home Page
        </div>

        <p className="border-2 border-lime-600 text-white bg-lime-600 card-body text-xl font-bold"> 
          Total Items: {items.length}
          </p>
      </div>
    </div>
  );
};

export default Admin;
