import { Helmet } from "react-helmet";

const Cart = () => {
    return (
        <div>
            <Helmet>
            <title>Food Court | Cart</title>
            </Helmet>
            <div className="hero">
            <div className="overflow-x-auto mt-32">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        {/* <th>
        </th> */}
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        {/* <th>
         
        </th> */}
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        {/* td2 */}
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        {/* td3 */}
        <td>Purple</td>
        {/* td-4 */}
        <td>
          <button className="btn btn-ghost btn-xs">details</button>
        </td>
      </tr> 
    </tbody>
  </table>
</div>
            </div>
        
        </div>
    );
};

export default Cart;