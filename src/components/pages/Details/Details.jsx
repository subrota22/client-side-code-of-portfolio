import React, { useContext, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { Helmet } from "react-helmet";
import FadeLoader from "react-spinners/FadeLoader";
import Wave from 'react-wavify'
import { BsFillTrash2Fill } from 'react-icons/bs';
import { AuthProvider } from '../../UserContext/UserContext';
import { BiEditAlt } from 'react-icons/bi';
import DeleteConformation from '../../share/DeleteConformation/DeleteConformation';
import { toast } from 'react-toastify';
const Details = () => {
    const [pageLoad, setPageLoad] = useState(true)
    const detailsInfo = useLoaderData();
    const [detailsData, setDetailsData] = useState(detailsInfo);
    const [modalData , setmodalData] = useState() ;
    const [showModal , setShowModal] = useState(false) ;
    const { user } = useContext(AuthProvider);

    React.useEffect(() => {
        if(!detailsInfo[0]?.projectId) return ;
        fetch(`https://portfolio-lake-nu-82.vercel.app/details/${detailsInfo[0]?.projectId}`)
            .then(res => res.json())
            .then(data => { setPageLoad(false) });
    }, [detailsInfo]);

    if (pageLoad) {
        return <div style={{ margin: "20% 50%" }}><FadeLoader color="#36d7b7" /></div>
    }

    const setData = (reciveData) => {
        setmodalData(reciveData) ;
        setShowModal(true) ;
       }


    //delete project section

    const deleteProjectSection = (id) => {
        // console.log(id);
            fetch(`http://localhost:3025/details/${id}`, {
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
                        const restData = detailsData.filter(data => data._id !== id);
                        setDetailsData(restData);
                    }
                });
    }

    return (
        <>
            <Helmet> <title> Project details </title></Helmet>

            {  showModal  && 
<DeleteConformation
 modalData={modalData}
 setShowModal={setShowModal}
deleteProject={deleteProjectSection}
>
</DeleteConformation>}

            <div>

                {
                    detailsInfo?.length !== 0 &&
                    <div className='text-center fs-2 fw-bold  styleHeadOfContent mx-auto p-3  rounded-2 '>
                        {
                            <Typewriter
                                words={['Details information', 'about the',
                                    detailsInfo[0]?.projectName ? detailsInfo[0]?.projectName : "project name not found"]}
                                loop={Infinity}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        }
                    </div>}
                <div className='my-5'>
                    <Wave mask="url(#mask)" fill="#1277b0" >
                        <h2> Hello </h2>
                        <defs>
                            <linearGradient id="gradient" gradientTransform="rotate(90)">
                                <stop offset="0" stopColor="white" />
                                <stop offset="0.5" stopColor="black" />
                            </linearGradient>
                            <mask id="mask">
                                <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
                            </mask>
                        </defs>
                    </Wave>
                </div>
                <div className="text-start mx-2 mb-5">
                    <NavLink to={"/"} className="btn btn-outline-info w-25 my-2">Go back home</NavLink>

                </div>

                <div >
                    {detailsInfo.length === 0 || !detailsInfo ? <>
                        <p className='text-danger fs-3 fw-bolder text-center my-2'>Project details not found coming soon...</p>
                
                    </> :

                        <div className="container">
                            <div className="row">

                                {

                                    detailsData?.map(detail =>
                                        <div className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3" key={detail?._id}>
                                            <div className="h-100 cardBackground text-white" >
                                                <img src={detail?.image} className="card-img-top myImage rounded-4 p-2" alt="detail" />
                                                <div className="card-body p-3">
                                                    <h5 className="card-title"> <span className='text-info'>Project name:</span> {detail?.projectName}</h5>
                                                    <h5 className="card-title"><span className='text-info'>Project section :  </span> {detail?.projectTitle}</h5>
                                                    <p className="card-text fs-5"> <span className='text-info'>Project details:</span>  {detail?.details}</p>


                                                    <div className='text-center d-flex justify-content-around mt-5'>
                                                        <div>
                                                            {
                                                                user?.email === "subrota45278@gmail.com" &&
                                                                <BsFillTrash2Fill className='text-danger fs-3 fw-bold' title={`Click on this icon to delete your  ${detail?.projectName} project data`}
                                                                    onClick={() => setData(detail)}></BsFillTrash2Fill>

                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                user?.email === "subrota45278@gmail.com" &&
                                                                <NavLink to={`/edit-section/${detail?._id}`} title={`Click on this icon to update your  ${detail?.projectName} project data`}>
                                                                    <BiEditAlt className='text-success fs-3 fw-bold'
                                                                    ></BiEditAlt>
                                                                </NavLink>

                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                </div>
            </div></>
    );
};

export default Details;