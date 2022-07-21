import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Space, Select, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import Api from "../Api.ts";
import { useStore } from "../Store.ts";
import EditableCell from "./EditableCell.tsx";

const ArticlesTable = ({ articles }) => {
  const { users, setArticles, setArticleSearchResults } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const showModal = (item) => {
    setModalTitle(item.name);
    setModalDescription(item.description);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isEditing = (item) => item.id === editingKey;

  const edit = (item) => {
    form.setFieldsValue({
      name: "",
      createdAt: "",
      ...item,
    });
    setEditingKey(item.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      const newData = [...articles];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await Api.modifyArticle(id, row);
        const newArticles = await Api.getArticles();
        setArticles(newArticles);
        setEditingKey("");
      } else {
        newData.push(row);
        setArticles(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const bookColumns = [
    {
      title: "Copertina",
      render: (item) => <img src={item.picture} alt="Copertina" width="100" />,
      align: "center" as "center",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      align: "center" as "center",
      editable: true,
    },
    {
      title: "Venditore:",
      dataIndex: "sellerId",
      key: "sellerId",
      align: "center" as "center",
      editable: true,
      render: (_, item) => (
        <Typography>{users.find((x) => x.id == item.sellerId) === undefined ? "Utente inesistente" : users.find((x) => x.id == item.sellerId).name}</Typography>
      ),
    },
    {
      title: "Data di aggiunta",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center" as "center",
      editable: true,
      render: (_, item) => <span>{moment(item.createdAt, "YYYY-MM-DD" || "YYYY/MM/DD").format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Azioni",
      key: "actions",
      dataIndex: "actions",
      align: "center" as "center",
      colSpan: 2,
      render: (_, item, index) => {
        const editable = isEditing(item);
        return editable ? (
          <Space>
            <Button
              onClick={() => {
                save(item.id);
              }}
              style={{
                marginRight: 8,
              }}
            >
              Salva
            </Button>
            <Popconfirm title="Interrompere modifica?" onConfirm={cancel}>
              <Button>Indietro</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button disabled={editingKey !== ""} onClick={() => showModal(item)}>
              Descrizione
            </Button>

            <Button disabled={editingKey !== ""} onClick={() => alert("Sarai indirizzato a " + item.buyUrl)}>
              Acquista
            </Button>

            <Button disabled={editingKey !== ""} onClick={() => edit(item)}>
              Modifica
            </Button>

            <Button
              disabled={editingKey !== ""}
              onClick={async () => {
                await Api.deleteArticle(item.id);
                const newArticles = await Api.getArticles();
                setArticles(newArticles);
                setArticleSearchResults(articles.filter((x) => x.id != item.id));
              }}
            >
              Cancella
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedBookColumns = bookColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (item) => ({
        item,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(item),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Indietro
          </Button>,
        ]}
      >
        <p>{modalDescription}</p>
      </Modal>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={articles}
        columns={mergedBookColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ArticlesTable;
