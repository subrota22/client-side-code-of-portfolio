import React from 'react';

const Footer = () => {
    return (
        <>
            
        <footer data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1000"
            className="footer text-white fs-2 fw-bold text-center py-5 bg-dark w-100 mt-5">

            <h2> Copy right by <span className="text-success">Subrota chandra sarker</span> 2022 </h2>

            <div className="text-center">
                <h2> Connected with me through all these social links <i className="fa-solid fa-arrow-right"></i> </h2>
                <div className="d-flex flex-row mb-3 text-center justify-content-center my-2">
                    <p className="px-3">
                        <a target="_blank" rel='noreferrer' className="text-white" href="https://www.facebook.com/subrotachandra22/"> <i
                                className="fa-brands fa-facebook"></i> </a>
                    </p>
                    <p className="px-3">
                        <a target="_blank" rel='noreferrer' className="text-white"
                            href="https://www.linkedin.com/in/subrota-chandra-sarker-abb17120b/"><i
                                className="fa-brands fa-linkedin"></i></a>
                    </p>
                    <p className="px-3"> <a target="_blank" rel='noreferrer' className="text-white" href="https://twitter.com/Subrota21087778"><i
                                className="fa-brands fa-twitter"></i></a> </p>
                    <p className="px-3"> <a target="_blank" rel='noreferrer' className="text-white" href="https://github.com/subrota5618"><i
                                className="fa-brands fa-github"></i></a> </p>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;