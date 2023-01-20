import { toast } from "react-toastify";

const createNewUser = (user) => {
    const joiningDate = new Date().toLocaleDateString() ;
    const postData = {
        name: user?.displayName,
        email: user?.email,
        profile: user?.photoURL,
        companyName: "company name not available",
        phoneNumber: user?.phoneNumber,
        joiningDate:joiningDate,
    }

    fetch("https://subrota-server-subrota22.vercel.appusers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                toast.success("Congrasulations your account recreated sucessfully !! ");
            } else if(data?.message === "activeUser") {
                toast.success("Welcome for come back in our website !! ");
            }
        }) 
        .catch (error => console.log(error))
};

export default createNewUser;