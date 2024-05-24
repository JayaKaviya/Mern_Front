import React from 'react';

const ParallaxBG = ({ url, children = "TRENDCRAZE" }) => {
  return (
    <div
      className="container-fluid parallax-container"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh', // Adjust the height as needed
        overflow: 'hidden', // Ensure child content doesn't overflow
        backgroundImage: `url(${url})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {/* Semi-transparent overlay */}
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay color
          zIndex: 1, // Ensure the overlay is above the background image
        }}
      ></div>

      {/* Text content */}
      <div
        className="parallax-content"
        style={{
          position: 'relative',
          zIndex: '2', // Ensure the text is above the overlay
          textAlign: 'center',
          color: '#fff', // Text color
        }}
      >
        <h1
          className="display-1 text-center py-5 highlighted-text"
          style={{ 
            color: '#ea266b',
            fontSize: '10rem', // Increase font size for the highlighted text
            fontWeight: 'bold', // Make the text bold
            textShadow: '4px 4px 4px rgba(0, 0, 0, 0.4)', // Add shadow effect
          }}
        >
          {children}
        </h1>
        {/* You can add other content here if needed */}
      </div>
    </div>
  );
};

export default ParallaxBG;
