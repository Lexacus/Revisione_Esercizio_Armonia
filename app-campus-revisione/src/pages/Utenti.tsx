import { Button } from "antd";
import React from "react";
import MyModal from "../components/Modal.tsx";
import UsersTable from "../components/UsersTable.tsx";
import { useStore } from "../Store.ts";

function Utenti() {
  const { users, setIsAddModalVisible } = useStore();
  return (
    <>
      <div className="site-layout-content">
        <Button type="primary" style={{ marginBottom: "20px" }} onClick={() => setIsAddModalVisible(true)}>
          Aggiungi Utente
        </Button>
        <MyModal kind="users"></MyModal>
        <UsersTable users={users} />
      </div>
    </>
  );
}

export default Utenti;
