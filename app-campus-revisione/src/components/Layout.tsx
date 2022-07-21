import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar.tsx";

const { Header, Content, Footer } = Layout;

const MyLayout: React.FC = () => {
  return (
    <Layout className="layout">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default MyLayout;
