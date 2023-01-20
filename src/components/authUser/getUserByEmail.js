
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const getUserByEmail = (email) => {

  fetch(`https://subrota-server.vercel.app/user/${email}`,{
            headers: {
                authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
            }
        })
            .then(res => {

                if(res.status === 403 ) {
                    toast.warning("You do have not access.");
                    return <Navigate to="/profile"></Navigate>
                } else{
                    return res.json() ;
                }
            })
            .then(data => data )
            .catch(error => console.log(error))

};

export default getUserByEmail;