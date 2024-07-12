import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,  signOut} from "firebase/auth";
import app from "../../firebase.init";
import useAxiosPublic from "../../Dashboard/axiosPublic";
// import { GoogleAuthProvider } from "firebase/auth/cordova";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPub = useAxiosPublic();

  //Create
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Sign In
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google Popup
//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, GoogleAuthProvider);
// }
 //Sign Out
 const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userData = { email: currentUser.email };
        axiosPub.post('/jwt', userData).then((res) => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        });
      } else {
        localStorage.removeItem('access-token');
      }
      
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPub]);

 
  const authInfo = { user, createUser, signIn, logOut, loading };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
