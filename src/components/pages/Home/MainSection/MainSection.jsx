import React from 'react';

const MainSection = () => {
    return (
        <>
             <div className="container" data-aos="fade-up" data-aos-duration="2000">
                <div className="card my-4 rounded-2 text-white bg-dark rounded-2 p-3">
                    <div className="card-bod">
                        <div className="d-flex flex-column-reverse flex-md-row">
                            <div className="col">
                                <h5 className="card-title">Name: Subrota chandra sarker </h5>
                                <h5 className="card-title">Profession: Full-stack developer </h5>
                                <p className="card-text">
                                    I am a full-stack web developer as you know from my <br/>
                                    technology skill, I love coding and learning new things <br/>
                                    not only coding but also other thing link singing, dancing, exercise,<br/>
                                    sports and so on. I have 3 plus experience in coding, not only<br/>
                                    this particular language I have other experiences like C, C++, Next.js <br/>
                                    but I am not an expert in these languages as I expert in my other technology skills.
                                    "Thanks to visit this website".
                                </p>
                                <a href="http://subrotachandra.lovestoblog.com/login.html" target="_blank" rel='noreferrer'
                                    className="btn btn-primary">Viist my website <i className="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                            <div className="col">
                                <img src="https://i.ibb.co/02tSMYX/subrota.png" alt="Subrota chandra sarker"
                                    className="subrotaImage  w-100  rounded-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
};

export default MainSection;