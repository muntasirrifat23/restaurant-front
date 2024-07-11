import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const Customer = () => {
  const[user, showUser] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res=>res.json())
    .then(data=> showUser(data))
  },[])
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food delete from cart",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/user/${id}`).
        then((res) => {
          console.log("Delete request successful:", res.data);
          // const updatedCart = showCart.filter((user) => user._id !== id);
          // setShowCart(updatedCart);
        });
      }
    });
  };


  return (
    <div className="hero-content">
      <Helmet>
        <title>Food Court | Customer</title>
      </Helmet>

      <div className="mt-24">
        <div className="text-center font-bold lg:text-5xl text-3xl italic text-red-800 mb-4">
          All Customers
        </div>

        <div>
          <p className="font-semibold">Total Customers : {user.length}</p>

          <div className="mb-12 max-w-5xl w-full mt-5">
          <table className="table">
            <thead className="bg-red-700 text-white text-lg">
              <tr className="text-center">
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Remove</th>
              </tr>
            </thead>

            {user.map((user) => (
              <tbody key={user._id} className="text-center">
                <tr className="border-1 border-white">
                  {/* <td>
                    <div className="avatar">
                      <div className="h-16 w-16">
                        <img
                          src={user.image}
                          className="rounded-xl"
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td> */}

                  <td className="font-semibold text-lg">{user.name}</td>

                  <td className=" font-semibold text-lg ">
                   {user.email}
                  </td>
                  <td className=" font-semibold text-lg ">
                   {user.password}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-error btn-md delIcon"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="flex justify-center users-center gap-1 mt-5 font-semibold text-xl total p-4 text-white">
            {/* Total Price of Your Food BDT : <FaBangladeshiTakaSign /> {price} */}
            
          </div>

        </div>

        </div>


      </div>
    </div>
  );
};

export default Customer;
