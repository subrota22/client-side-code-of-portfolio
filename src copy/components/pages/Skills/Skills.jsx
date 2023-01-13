
import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
const Skills = () => {
    const [skills , setSkills] = useState([]) ;
    console.log("skills" , skills);
      useEffect(() => {
        fetch(`https://portfolio-lake-nu-82.vercel.app/skills`)
        .then(res => res.json())
        .then(data => setSkills(data))
        .catch(error => console.log(error))
    }, []);
    return (
        <>
        <div className="container">
        <div className='text-center fs-2 fw-bold text-info my-3'>
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
            <div className="row">
  
            {
                skills.map(skill => 
                    <div className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3"  data-aos="zoom-in" data-aos-delay="600"  data-aos-duration="2000"  key={skill._id}>
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