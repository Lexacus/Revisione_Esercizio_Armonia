import { Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Searchbar: React.FC = () => {
  let navigate = useNavigate();
  return (
    <Input
      id="ricerca"
      placeholder="Ricerca nome utente o libro"
      style={{ marginTop: "15px", width: "200px" }}
      onChange={(e) => {
        if (e.target.value === "") {
          navigate("/", { replace: true });
        } else {
          navigate("/Risultati?searchresults=" + e.target.value, { replace: true });
        }
      }}
    />
  );
};
export default Searchbar;
