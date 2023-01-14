
import { Typewriter } from 'react-simple-typewriter';
import React , { useEffect, useState } from 'react'; 
import HashLoader from 'react-spinners/HashLoader';
const Skills = () => {
    const [skills , setSkills] = useState([]) ;
    const [pageLoad , setPageLoad] = useState(true) ;
    useEffect(() => {
        fetch(`https://portfolio-lake-nu-82.vercel.app/skills`)
        .then(res => res.json())
        .then(data =>{ setSkills(data);    setPageLoad(false) ;})
        .catch(error => console.log(error))
    }, []);

    if(pageLoad){
        return <>
        <div className='text-center' style={{ margin:"20% 45%"}}>
            <HashLoader color='blue'></HashLoader>
        </div>
        </>
    }

    return (
        <>
        <div className="container">
        <div className='text-center mx-auto fs-2 fw-bold styleHeadOfContent p-4 rounded-2'>
         {
                 <Typewriter
                 words={['My skill', 'in programming languages' , 'thanks to visit',  'this website']}
                 loop={Infinity}
                 cursor
                 cursorStyle='_'
                 typeSpeed={70}
                 deleteSpeed={50}
                 delaySpeed={1000}
               />
            }
         </div>
            <div className="row"  data-aos="zoom-in" data-aos-delay="600"  data-aos-duration="2000">
  
            {
                skills.map(skill => 
                    <div className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3"   key={skill._id}>
                    <div className="card h-100 bg-dark text-white">
                        <img src={skill.image} className="card-img-top myImage" alt="skill" />
                        <div className="card-body">
                            <h5 className="card-title"> Language: {skill.language}</h5>
                            <h5 className="card-title"> Experience: {skill.experience}</h5>
                            <p className="card-text"> Integrate: {skill.integrate}</p>
                            <p className="card-text"> Starting date: {skill.startingDate}</p>
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

export default Skills;