import React from 'react';
import leilsaunas from "../../public/video/leilsaunas.mp4"


const Home = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        className="w-full h-screen object-cover"
      >
        <source src={leilsaunas} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
};

export default Home;