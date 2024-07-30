import { useContext } from 'react';
import { AuthContext } from '../../Component/Auth/AuthProvider';
import useAdmin from '../useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminPrivate = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, setIsAdmin]= useAdmin();
    const location = useLocation();

    if(user && isAdmin){
        return children;
    }

    if(loading || setIsAdmin){
        return <progress className='progress w-56'></progress>
    }

    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default AdminPrivate;

AdminPrivate.propTypes = {
    children: PropTypes.node.isRequired
}