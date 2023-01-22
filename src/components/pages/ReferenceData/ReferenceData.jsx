import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Typewriter } from 'react-simple-typewriter';
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-toastify';
import DeleteConformation from '../../share/DeleteConformation/DeleteConformation';
import errorDeleteMessage from '../../share/deleteMessage/errorDeleteMessage';
import successDeleteMessage from '../../share/deleteMessage/successDeleteMessage';
import { AuthProvider } from '../../UserContext/UserContext';

const ReferenceData = () => {
    const [pageLoad, setPageLoad] = useState(true);
    const [allReferences, setAllReferences] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setmodalData] = useState();
    const { user } = useContext(AuthProvider);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pages = Math.ceil(count /pageSize);

    React.useEffect(() => {
        
        fetch(`https://subrota-server-subrota22.vercel.app/referallInformation?page=${page}&size=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setPageLoad(false);
                setAllReferences(data?.data);
                setCount(data?.count) ;
            }
            );
    }, [page , pageSize]);

        //set data 
        const setData = (reciveData) => {
            setmodalData(reciveData);
            setShowModal(true);
        }

        //deleter reference data 

    const deleteReference = (id) => {

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
                        const restData = allReferences.filter(data => data._id !== id);
                        setAllReferences(restData);
                        successDeleteMessage() ;
                    }
                }).catch(error => errorDeleteMessage(error))
             
    }

    if (pageLoad) {
        return <>
            <div className='text-center' style={{ margin: "20% 45%" }}>
                <HashLoader color='blue'></HashLoader>
            </div>
        </>
    }
console.log(">>---->>--->" , allReferences );
    return (
 <>
            <Helmet><title>All reference info </title></Helmet>

          {
              allReferences?.length !==0 &&  <div>
                 {showModal &&
                <DeleteConformation
                    modalData={modalData}
                    setShowModal={setShowModal}
                    deleteFunction={deleteReference}
                >
                </DeleteConformation>}

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
                                    {/* <img src={reference?.image} className="card-img-top  rounded-4 p-2" alt="reference" /> */}
                                    <PhotoProvider>
                                        <PhotoView src={reference?.image ? reference?.image : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}>
                                            <img src={reference?.image ? reference?.image : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                            className="w-100 p-3" style={{height:"250px" , borderRadius:"28px"}} 
                                            alt={reference?.name ? reference?.name : "name not found"}
                                            title="Click on this image to see the full image"
                                            />
                                        </PhotoView>
                                    </PhotoProvider>
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
                                                    onClick={() => setData(reference)}></BsFillTrash2Fill>

                                            }
                                        </>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

{/*       
                    pagination  */}
                    <div className="text-center my-4">

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
                            <button  className={pageNumber === page ? 'mx-2 px-4 py-2 fs-5 fw-bold my-3 activeButton' : 'btn px-4 fs-5 fw-bold py-2 btn-success mx-2'}
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
                    <option className='text-info fw-bold' selected disabled> Select page size. </option>
                    <option value="2">2</option>
                         <option value="4">4</option>
                         <option value="6">6</option>
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
  }

{
  allReferences?.length === 0 &&   
   <div className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2' 
   style={{margin:"180px 20px"}}>
    {
        //My best projects that I made in 20/10/2022
      <Typewriter
            words={['There is no', 'Reference', 'yet']}
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

export default ReferenceData;