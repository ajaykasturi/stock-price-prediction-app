import React from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10 flex-1 bg-gray-50">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
