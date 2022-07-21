import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar.tsx";

const MyLayout: React.FC = () => {
  return (
    <Layout className="layout">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </Layout>
  );
};

export default MyLayout;
