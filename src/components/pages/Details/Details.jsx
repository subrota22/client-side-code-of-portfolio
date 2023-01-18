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
import { PhotoProvider, PhotoView } from 'react-photo-view';
import successDeleteMessage from '../../share/deleteMessage/successDeleteMessage';
import errorDeleteMessage from '../../share/deleteMessage/errorDeleteMessage';
const Details = () => {
    const [pageLoad, setPageLoad] = useState(true)
    const detailsInfo = useLoaderData();
    const [detailsData, setDetailsData] = useState([]);
    const [modalData, setmodalData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pages = Math.ceil(count /pageSize);
    const { user } = useContext(AuthProvider);
    React.useEffect(() => {
        fetch(`https://subrota-server-subrota22.vercel.app/details?page=${page}&size=${pageSize}&id=${detailsInfo[0]?.projectId}`)
            .then(res => res.json())
            .then(data => {
                setDetailsData(data?.data);
                setCount(data?.count);
                setPageLoad(false);
            });
    }, [detailsInfo, page, pageSize]);

    if (pageLoad) {
        return <div style={{ margin: "20% 50%" }}><FadeLoader color="#36d7b7" /></div>
    }

    const setData = (reciveData) => {
        setmodalData(reciveData);
        setShowModal(true);
    }


    //delete project section

    const deleteProjectSection = (id) => {
        // console.log(id);
        fetch(`https://subrota-server.vercel.app/details/${id}`, {
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
                    successDeleteMessage() ;
                }
            })
            .catch(error => errorDeleteMessage(error))
    }

    return (
        <>
            <Helmet> <title> Project details </title></Helmet>
{
    detailsData?.length !==0 && <div>
        
        {showModal &&
                <DeleteConformation
                    modalData={modalData}
                    setShowModal={setShowModal}
                    deleteFunction={deleteProjectSection}
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
                <div className="text-center mx-2 mb-5">
                    <NavLink to={"/"} className="btn btn-outline-success w-25 my-2">Go back home</NavLink>

                </div>

                <div >

                        <div className="container">
                            <div className="row">

                                {

                                    detailsData?.map(detail =>
                                        <div className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3" key={detail?._id}>
                                            <div className="h-100 cardBackground text-white" >
                                                <PhotoProvider>
                                                    <PhotoView src={detail?.image ? detail?.image : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}>
                                                        <img src={detail?.image ? detail?.image : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                                            className="w-100 projectImageStyle" style={{ height: "250px" }}
                                                            alt={detail?.technology ? detail?.technology : "technology not found"}
                                                            title="Click on this image to see the full image"
                                                        />
                                                    </PhotoView>
                                                </PhotoProvider>
                                                <div className="card-body p-3">
                                                    <h5 className="card-title"> <span className='text-info'>Project name:</span> {detail?.projectName}</h5>
                                                    <h5 className="card-title"><span className='text-info'>Project section :  </span> {detail?.projectTitle}</h5>
                                                    <p className="card-text fs-5"> <span className='text-info'>Project details:</span>  {detail?.details}</p>


                                                    <div className='text-center d-flex justify-content-around mt-5'>
                                                        <div>
                                                            {
                                                                user?.email === "subrota45278@gmail.com" &&
                                                                <BsFillTrash2Fill style={{ cursor: "pointer" }} className='text-danger fs-3 fw-bold' title={`Click on this icon to delete your  ${detail?.projectName} project data`}
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
                    
                </div>
                {/* pagination  */}
                <div className="text-center">

                    {
                        //page + 1 >=
                        page + 1 >= [...Array(pages).keys()].length &&
                        <button  
                        className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages===1  && 'd-none'}`}
                        onClick={() => setPage(page - 1)}>
                            <i class="fa-solid fa-angle-left text-white fs-4 fw-bold"></i>
                            <i class="fa-solid fa-angle-left text-white fs-4 fw-bold"></i>
                        </button>
                    }

                    {
                        [...Array(pages).keys()].map(pageNumber =>
                            <button className={pageNumber === page ? ' activeButton mx-2 px-4 py-2 fs-5 fw-bold my-3' : 'btn px-4 fs-5 fw-bold py-2 btn-success mx-2'}
                                onClick={() => setPage(pageNumber)}
                            >{pageNumber + 1}</button>
                        )
                    }

                    {

                        [...Array(pages).keys()].length > page + 1 &&
                        <button 
                        className={`btn btn-primary text-white fs-5 fw-bold py-2 px-3 mx-3 ${pages===1  && 'd-none'}`}
                        onClick={() => setPage(page + 1)}>

                            <i class="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                            <i class="fa-solid fa-angle-right text-white fs-4 fw-bold"></i>
                        </button>
                    }


                    {/* page size set  */}
                    <select className='btn btn-success text-white fs-5 fw-bold py-2 px-4 mx-3' onChange={(e) => setPageSize(e.target.value)}>
                    <option className='text-info fw-bold' disabled> Select page size. </option>
                    <option value="2">2</option>
                         <option value="4">4</option>
                         <option value="6" 
                                  selected>6</option>
                         <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                        <option value="110">110</option>
                        <option value="120">120</option>
                        <option value="300">130</option>
                    </select>

                </div>
            </div>
    </div>
}

            {
  detailsData?.length === 0 &&   
   <div style={{margin:"158px 78px"}} className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
    {
        //My best projects that I made in 20/10/2022
      <Typewriter
            words={['There is no', 'detials have', 'yet !!']}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
        />
    }
</div>
} 
            </>
    );
};

export default Details;