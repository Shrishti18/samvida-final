import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className="lay-out">
      <Header />
      <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
