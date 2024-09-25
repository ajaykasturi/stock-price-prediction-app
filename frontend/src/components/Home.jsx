import React from "react";
import url from "../assets/landingimg.jpeg";
function Home() {
  return (
    <>
      <img
        className="h-screen max-w-full w-full object-cover absolute inset-0 "
        src={url}
      />
    </>
  );
}

export default Home;
