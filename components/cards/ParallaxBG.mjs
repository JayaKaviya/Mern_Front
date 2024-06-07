import React from 'react';

const ParallaxBG = ({ url, children = "LETSCONNECT" }) => {
  return (
    <div
      className="container-fluid parallax-container"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh', 
        overflow: 'hidden',
        backgroundImage: `url(${url})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
     
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 1, 
        }}
      ></div>

    
      <div
        className="parallax-content"
        style={{
          position: 'relative',
          zIndex: '2',
          textAlign: 'center',
          color: '#fff', 
        }}
      >
        <h1
          className="display-1 text-center py-5 highlighted-text"
          style={{ 
            color: '#ea266b',
            fontSize: '10rem', 
            fontWeight: 'bold', 
            textShadow: '4px 4px 4px rgba(0, 0, 0, 0.4)', 
          }}
        >
          {children}
        </h1>
       
      </div>
    </div>
  );
};

export default ParallaxBG;
