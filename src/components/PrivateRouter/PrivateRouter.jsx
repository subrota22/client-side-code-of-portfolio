import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Skeleton from '../Share/Skeleton/Skeleton';
import { AuthProvider } from '../UserContext/UserContext';

const PrivateRouter = ({children}) => {
    const {user , load } = useContext(AuthProvider) ;
    const location = useLocation() ;
    if(load) {
        return <Skeleton></Skeleton>
    } ;
   if(user && user?.uid){
   return children ;
   }
   return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRouter;