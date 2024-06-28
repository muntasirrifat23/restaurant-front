import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Cart = () => {
  const [showCart, setShowCart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setShowCart(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Food Court | Cart</title>
      </Helmet>

      <div className="hero ">
        <div className="overflow-x-auto mt-32 mb-12 lg:max-w-5xl w-full max-w-xl">
          {/* {showC.length} */}
          <table className="table">
            <thead className="bg-red-700 text-white text-lg">
              <tr className="text-center">
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Food Price</th>
                <th>Action</th>
              </tr>
            </thead>

            {showCart.map((showC) => (
              <tbody key={showC.id} className="text-center">
                <tr className="border-1 border-red-800">
                  <td>
                    <div className="avatar ">
                      <div className=" h-16 w-16">
                        <img src={showC.image} className="rounded-xl" />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="font-semibold text-lg">{showC.name}</div>
                  </td>

                  <td
                    className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg">
                    {showC.price}
                    <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                  </td>

                  <td>
                    <div className="flex justify-center items-center">
                    <button className="btn btn-ghost btn-xs">Payment</button>
                    <button className="btn btn-ghost btn-xs">Delete</button>
                    </div>
                   
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
