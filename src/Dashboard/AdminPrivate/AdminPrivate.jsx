import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminPrivate = ({children}) => {
    const {user, loading}= useContext(AuthContext);
    if(user){
        return children;
    }
    if(loading){
        return <progress className="progress w-56"></progress>;
    }

        return <Navigate to='/login' replace></Navigate>;   
};

export default AdminPrivate;

AdminPrivate.propTypes = {
    children: PropTypes.node
}