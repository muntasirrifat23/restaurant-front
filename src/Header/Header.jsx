import { Link } from "react-router-dom";
import image from "../../public/main-icon.png";
import { useContext } from "react";
import { AuthContext } from "../Component/Auth/AuthProvider";
import Marquee from "react-fast-marquee";
import { FaCartShopping } from "react-icons/fa6";
import useAdmin from "../Dashboard/useAdmin";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleOut = () => {
    logOut().then().catch();
  };

  // const isAdmin = true;
  const [isAdmin] = useAdmin();

  const NavLink = isAdmin ? (
    <p className="font-bold lg:flex text-xl">
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/revenue">Revenue</Link>
      </li>
      <li>
        <Link to="/allItems">All Items</Link>
      </li>
      <li>
        <Link to="/addItems">Add Items</Link>
      </li>
    </p>
    
  ) : (
    <p className="font-bold lg:flex text-xl">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/items">Items</Link>
      </li>
      <li>
        <Link to="/reserve">Reservation</Link>
      </li>
      <li>
        <Link to="/order">Orders</Link>
      </li>
    </p>
  );

  return (
    <div className="fixed z-10 lg:bg-opacity-30 max-w-screen-2xl mx-auto lg:text-black bg-lime-600 opacity-90">
      <div className="text-center ">
        <Marquee className="text-white font-semibold lg:bg-lime-600">
          Our food court boasts a variety of delicious options, from Asian
          cuisine to pizza and sandwiches. With quick service and plenty of
          seating, it is the perfect spot to grab a bite on the go or enjoy a
          leisurely meal with friends and family. Come hungry and leave
          satisfied!
        </Marquee>
      </div>
      <div className="navbar bg-lime-200 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* small */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              {NavLink}
            </ul>
          </div>
          <img src={image} alt="" className="h-16 w-20 rounded-2xl" />
          <p className="font-bold ml-2 text-2xl ">Food Court</p>
        </div>
        {/* big */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavLink}</ul>
        </div>

        {/* { !isAdmin ? <> </> : <> </>} */}
        {!isAdmin ? (
          <>
            {/* For Not Admin */}
            <div className="navbar-end">
              <Link
                to="/cart"
                className="text-2xl text-red-600 border-red-600 border-2 p-2 rounded-3xl bg-white"
              >
                <FaCartShopping />
              </Link>

              {user ? (
                <div>
                  <button
                    onClick={handleOut}
                    className="ml-3 btn btn-error text-white"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="ml-3 btn btn-success text-white">
                      Log In
                    </button>
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {/* For Not Admin */}
            <div className="navbar-end">
              {user ? (
                <div>
                  <button
                    onClick={handleOut}
                    className="ml-3 btn btn-error text-white"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="ml-3 btn btn-success text-white">
                      Log In
                    </button>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
