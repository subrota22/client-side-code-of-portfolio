import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { Typewriter } from 'react-simple-typewriter';
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const ReferenceData = () => {
    const [pageLoad, setPageLoad] = useState(true);
    const [allReferences, setAllReferences] = useState([]);
    console.log(allReferences);
    const { user } = useContext(AuthProvider);
    React.useEffect(() => {
        fetch(`https://subrota-server.vercel.app/references`)
            .then(res => res.json())
            .then(data => {
                setPageLoad(false);
                setAllReferences(data);
            }
            );
    }, []);

    const deleteReference = (id) => {
        const confirmation = window.confirm("Do you want to delete this data?");
        if (confirmation) {
            fetch(`https://subrota-server.vercel.app/references/${id}`, {
                method: "DELETE",
                headers: {
                    authentication: `Bearer ${localStorage.getItem("portfolio-token")} `
                }
            })
                .then(res => {

                    if (res.status === 403) {
                        toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Your reference data is deleted !! ");
                        const restData = allReferences.filter(data => data._id !== id);
                        setAllReferences(restData);
                    }
                });
        } else {
            toast.info("Your data is safe now ");
        }
    }
    if (pageLoad) {
        return <>
            <div className='text-center' style={{ margin: "20% 45%" }}>
                <HashLoader color='blue'></HashLoader>
            </div>
        </>
    }
    return (
        <>
            <Helmet><title>All reference info </title></Helmet>
            <div className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
                    {
                        //My best projects that I made in 20/10/2022
                        <Typewriter
                            words={['All referral information', 'they have given a reference', 'we proud of them.']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    }
                </div>
            <div className="container">
                <div className="row">
                    {

                        allReferences?.map(reference =>
                            <div className="col col-12 col-sm-12 col-md-6 my-3" key={reference?._id}>
                                <div className="h-100 cardBackground text-white">
                                    <img src={reference?.image} className="card-img-top myImage rounded-4 p-2" alt="reference" />
                                    <div className="card-body p-3">
                                        <h5 className="card-title"> <span className='text-info'>Name:</span> {reference?.name}</h5>
                                        <h5 className="card-title"><span className='text-info'>Organization :  </span> {reference?.organization}</h5>
                                        <p className="card-text fs-7"> <span className='text-info'>Phone number:</span>  {reference?.phone_number}</p>
                                        <p className="card-text fs-7"> <span className='text-info'>Reference Message:</span>  {reference?.referenceMessage}</p>
                                        <p className="card-text fs-7"> <span className='text-info'>Reference Time:</span>  {reference?.referenceTime ? reference?.referenceTime : "00/00/00"}</p>
                                        <p className="card-text fs-7"> <span className='text-info'>Reference Date:</span>  {reference?.referenceDate ? reference?.referenceDate : "00/00/00"}</p>


                                        <>
                                            {
                                                user?.email === "subrota45278@gmail.com" &&
                                                <BsFillTrash2Fill className='text-danger fs-3 fw-bold'
                                                    onClick={() => deleteReference(reference?._id)}></BsFillTrash2Fill>

                                            }
                                        </>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ReferenceData;