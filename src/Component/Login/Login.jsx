import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase.init";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useContext, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { IoLogInOutline } from "react-icons/io5";

const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const [googleUser, setGoogleUser] = useState(null);
    const [userError, setUserError] = useState('');
    const [show, setShow] = useState(false);

    const { signIn } = useContext(AuthContext);

    //Reset
    const [, setFormData] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    //Log In
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setUserError('');
        if (password.length < 6) {
            setUserError("Password should be at least 6 character");
            return;
        }

        //Auth Sign In
        signIn(email, password)
            .then(r => {
                console.log(r);
                setFormData({ email: '', password: '' }); // Reset
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            })

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setFormData({ email: '', password: '' }); // Reset form fields
                navigate('/');
            })
            .catch(error => {
                console.error(error.message);
            })
        }

    //Google Pop-up
    const handleSign = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                setGoogleUser(user);
                console.log(user);
            })
            .catch((error) => {
                console.log('Google Error', error.message);
            })
    }

    //Github Pop-up
    const handleGithub = () => {
        signInWithPopup(auth, gitProvider)
            .then(r => {
                const user = r.user;
                setGoogleUser(user);
                console.log(user);
            })
            .catch((error) => {
                console.log('Git Error', error.message);
            })
    }

    //Google Sign Out
    const googleOut = () => {
        signOut(auth)
            .then(result => {
                setGoogleUser(null);
                console.log(result);
            })
            .catch((error) => {
                console.log('error happen', error.message);
            })
    }

    return (
        <div>
            <div className="hero">
                <div className="hero-content ">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-lime-200 border-4 border-b-lime-700">
                        <h1 className="text-5xl font-bold mx-auto p-4 text-red-800">Login Here</h1>

                        <form onSubmit={handleLogIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold ">Password</span>
                                </label>

                                <p className="flex space-y-2">

                                    <input type={show ? "text" : "password"} name="password" placeholder="Enter Password" className="input input-bordered mr-4" required />
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
                            <button className="btn btn-error text-white text-xl font-bold">
                                    Login <IoLogInOutline />
                                </button>
                                {
                                    googleUser ?
                                        <button className="btn btn-black mt-3 rounded-full" onClick={googleOut}>Sign Out</button> :
                                        <div className="mx-auto">
                                            <button onClick={handleSign} className="mx-auto mt-5 border-2 border-orange-700	rounded-full p-2 mr-4"> <FaGoogle className="text-orange-700"></FaGoogle></button>
                                            <button onClick={handleGithub} className="mx-auto mt-5 border-2 border-black rounded-full p-2 bg-orange-"> <FaGithub className="text-black"></FaGithub></button>
                                        </div>

                                    //user ? logout : sign in
                                }

                            </div>
                            <p className="mx-auto">Have No Account? Do<Link to='/register' className="ml-1  text-blue-700 font-semibold">Register</Link></p>

                        </form>
                        <p className="text-red-600 mx-auto mb-4 font-semibold">
                            {
                                userError && <> {userError}</>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;