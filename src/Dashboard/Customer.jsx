import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaTrashCan, FaUserGroup } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const Customer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error("No access token found in localStorage");
      }
      const res = await axiosSecure.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
  });

  // const[user, showUser] = useState([])
  // useEffect(()=>{
  //   fetch('https://restaurant-backend-pearl.vercel.app/user')
  //   .then(res=>res.json())
  //   .then(data=> showUser(data))
  // },[])

  const handleUserDel = (id) => {
    Swal.fire({
      title: "Remove This User?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://restaurant-backend-pearl.vercel.app/user/${id}`).then((res) => {
          console.log("Delete request successful:", res.data);
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted",
            showConfirmButton: false,
            timer: 1500
          });     
        });
      }
    });
  };

  const handleRole=(user)=>{
    axiosSecure.patch(`/user/admin/${user._id}`)
    .then(res=>{
      //console.log(res.data);
      if(res.data.modifiedCount>0){
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} Is New Admin`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  return (
    <div className="hero-content mx-auto">
      <Helmet>
        <title>Food Court | Users</title>
      </Helmet>

      <div className="mt-24 justify-center">
        <div className="text-center font-bold text-4xl italic text-red-800 mb-4">
          All Users
        </div>

        <div>
          <p className="font-semibold">Total Users : {user.length}</p>

          <div className="mb-12 mt-5">
            <table className="table">
              <thead className="bg-red-700 text-white text-lg">
                <tr className="text-center">
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Remove</th>
                </tr>
              </thead>

              {user.map((user, index) => (
                <tbody key={user._id} className="text-center">
                  <tr className="border-1 border-red-900">
                    <td>{index +1}</td>
                    <td className="font-semibold text-lg">{user.name}
                    </td>
                    <td className=" font-semibold text-lg">{user.email}                 
                    </td>
                    <td>
                      {
                        user.role === 'admin' ? 'Admin' :
                        <>
                         <button onClick={() => handleRole(user)} className="btn  btn-md roleIcon bg-blue-800 text-white btn-success text-lg">
                        <FaUserGroup />
                      </button>
                        </>
                      }   
                    </td>
                    
                    <td>
                      <button onClick={() => handleUserDel(user._id)} className="btn btn-error btn-md delIcon">
                        <FaTrashCan />
                      </button>
                     
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
