import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../UserContext/UserContext';

const PrivateRouter = ({children}) => {
    const {user , load } = useContext(AuthProvider) ;
    const location = useLocation() ;
    if(load){
        return <>
        <div className='text-center' style={{ margin:"20% 45%"}}>
            <HashLoader color='blue'></HashLoader>
        </div>
        </>
    }
   if(user && user?.uid){
   return children ;
   }
   return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRouter;