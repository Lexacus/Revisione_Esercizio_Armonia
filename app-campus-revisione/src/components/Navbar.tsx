import { Menu, Input } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar.tsx";

const Navbar: React.FC = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={[
          { key: 1, label: <Link to="/">Utenti</Link> },
          { key: 2, label: <Link to="/Libri">Libri</Link> },
          {
            key: 3,
            disabled: true,
            label: "",
            icon: <Searchbar />,
          },
        ]}
      />
    </Header>
  );
};

export default Navbar;
