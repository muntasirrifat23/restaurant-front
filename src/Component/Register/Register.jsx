import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase.init";
import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const Register = () => {
    const auth = getAuth(app);
    const [userError, setUserError] = useState('');
    const [show, setShow] = useState(false);

    const { createUser } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setUserError('');

        if (password.length < 6) {
            setUserError("Password should be at least 6 character");
            return;
        }

        //Auth Create User
        createUser(email, password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error);
            })

        //Email-password auth
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
                setUserError(error.message);
            })
        console.log("submit");
    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col bg-blue-200  rounded-xl">
                    <h1 className="text-5xl font-bold mx-auto p-4">Registration</h1>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter Valid Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">New  Password</span>
                                </label>
                                <p className="flex space-y-2">
                                    <input type={show ? "text" : "Password"} name="password" placeholder="Enter New Password" className="input input-bordered mr-4 " required />
                                    <span onClick={() => setShow(!show)} >
                                        <p className="text-2xl">
                                            {
                                                show ? <FaEyeSlash /> : <FaRegEye />
                                            }
                                        </p>

                                    </span>
                                </p>

                                
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success text-white font-bold">Register</button>
                            </div>
                            <p className="text-red-600">
                                {
                                    userError && <> {userError}</>
                                }
                            </p>
                            <p>Have An Account? Do<Link to='/login' className="ml-1  text-blue-700 font-semibold">Login</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;