import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../UserContext/UserContext';

const AdminRouter = ({children}) => {
    const {user , load } = useContext(AuthProvider) ;
    const location = useLocation() ;
    const [userData, setUserDaata] = useState([]);
    // console.log(userData);
    const [pageLoad , setPageLoad] = useState(true) ;
    React.useEffect(() => {
        fetch(`https://subrota-server.vercel.app/user/${user?.email}`,{
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {

                if(res.status === 403 ) {
                    toast.warning("You do have not access to these components.");
                    return <Navigate to="/" state={{from:location}} replace></Navigate>
                } else{
                    return res.json() ;
                }
            })
            .then(data => {setUserDaata(data); setPageLoad(false) ;})
            .catch(error => console.log(error))
    }, [user?.email , location]);

    if(load  || pageLoad){
        return <>
        <div className='text-center' style={{ margin:"20% 45%"}}>
            <HashLoader color='blue'></HashLoader>
        </div>
        </>
    }
   if(user && user?.uid && userData.role ==="admin" ){
   return children ;
   }
   return <Navigate to="/"></Navigate>
};

export default AdminRouter;