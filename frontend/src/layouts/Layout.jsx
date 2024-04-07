import React from "react";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
function Layout({ children }) {
  let style = "py-20 mx-auto flex-1 bg-gray-50";
  if (children.type.name == "Home") {
    style = "mx-auto flex-1 bg-gray-50";
  }
  return (
    <div className="relative">
      <NavBar />
      <div className={style}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
