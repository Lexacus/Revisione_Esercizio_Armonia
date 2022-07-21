import { Button } from "antd";
import React from "react";
import ArticlesTable from "../components/ArticlesTable.tsx";
import MyModal from "../components/Modal.tsx";
import { useStore } from "../Store.ts";

function Utenti() {
  const { articles, setIsAddModalVisible } = useStore();
  return (
    <>
      <div className="site-layout-content">
        <Button type="primary" style={{ marginBottom: "20px" }} onClick={() => setIsAddModalVisible(true)}>
          Aggiungi Libro
        </Button>
        <MyModal kind="articles"></MyModal>
        <ArticlesTable articles={articles} />
      </div>
    </>
    /*PROVA*/
  );
}

export default Utenti;
