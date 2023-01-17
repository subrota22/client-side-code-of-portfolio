import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
const PageLoad = () => {
    return (
        <>
            <div className='text-center' style={{ margin: "20% 45%" }}>
                <HashLoader color='blue'></HashLoader>
            </div>
    
        </>
    );
};

export default PageLoad;