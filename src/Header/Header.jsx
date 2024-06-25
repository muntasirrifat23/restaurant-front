import { Link } from "react-router-dom";
import image from '../../public/main-icon.png'
import { useContext } from "react";
import { AuthContext } from "../Component/Auth/AuthProvider";
import Marquee from "react-fast-marquee";
import moment from 'moment';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleOut = () => {
        logOut()
            .then()
            .catch()
    }

    const NavLink = <p className="font-bold lg:flex text-xl lg:underline ">
        <li><Link to='/'>Home</Link> </li>
        <li><Link to='/items'>Items</Link> </li>
        <li><Link to='/cart'>Cart</Link> </li>
        <li><Link to='/payment'>Payment</Link> </li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Registration</Link></li>
    </p>

    return (
        <div >
            <div className="text-center ">
                {/* <img src={pic} className="mx-auto"/> */}
                <p className="text-purple-800 italic font-semibold text-4xl underline ">Premium Food Court
                </p>
                
                <p className="font-semibold text-xl mt-2 mb-2">
                    {moment().format(' dddd, Do MMMM, YYYY, h:mm A')}
                </p>
                <Marquee className="text-red-700 font-semibold">
                Our food court boasts a variety of delicious options, from Asian cuisine to pizza and sandwiches. With quick service and plenty of seating, it is the perfect spot to grab a bite on the go or enjoy a leisurely meal with friends and family. Come hungry and leave satisfied!
                </Marquee>
            </div>
            <div className="navbar bg-lime-200 fixed z-10 lg:bg-opacity-30 max-w-screen-xl mx-auto lg:text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        {/* small */}
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                            {NavLink}
                        </ul>
                    </div>
                    <img src={image} alt="" className="h-16 w-20 rounded-2xl" />
                </div>
                {/* big */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {NavLink}
                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        user ? <p className="flex">
                            <div className="font-bold mt-3">
                                {user.displayName}
                            </div>
                            <div>
                                <button onClick={handleOut} className="ml-3 btn btn-error text-white">Log Out</button>
                            </div> </p> :
                            <>
                                <Link to='/login'>
                                    <button className="ml-3 btn btn-success text-white">Log In</button></Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;