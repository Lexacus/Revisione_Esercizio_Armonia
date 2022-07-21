import { Modal, Form, Input, Select, DatePicker } from "antd";
import MyUpload from "./Upload.tsx";
import { useStore } from "../Store.ts";
import Api from "../Api.ts";
import moment from "moment";
import React from "react";

const { Option } = Select;

const MyModal = ({ kind }) => {
  const { users, setUsers, articles, setArticles, setIsAddModalVisible, isAddModalVisible, imageUrl, setImageUrl } = useStore();

  const [form] = Form.useForm();

  const handleOk = async (values: any) => {
    if (kind === "users") {
      const newUser = {
        ...values,
        createdAt: moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        avatar: imageUrl,
        articlesIds: [],
        id: eval(users[users.length - 1].id) + 1,
      };
      await Api.addUser(newUser).then(alert("Utente aggiunto."));
      const newUsers = await Api.getUsers();
      setUsers(newUsers);
    }
    if (kind === "articles") {
      const newArticle = {
        ...values,
        createdAt: moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        picture: imageUrl,
        id: eval(articles[articles.length - 1].id) + 1,
      };
      await Api.addArticle(newArticle).then(alert("Libro aggiunto."));
      const newArticles = await Api.getArticles();
      setArticles(newArticles);
    }
    form.resetFields();
    setImageUrl(undefined);
    setIsAddModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl(undefined);
    setIsAddModalVisible(false);
  };

  const userModal = (
    <Modal
      visible={isAddModalVisible}
      title="Aggiungi un utente"
      okText="Aggiungi"
      cancelText="Indietro"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch((info) => {
            console.log("Validazione fallita:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: "public" }}>
        <Form.Item>
          <MyUpload></MyUpload>
        </Form.Item>
        <Form.Item
          label="Nome e Cognome"
          name="name"
          rules={[
            { required: true, message: "Inserire nome!" },
            { pattern: /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/gm, message: "Nome non valido!" },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="Data di nascita" name="birthdate" rules={[{ required: true, message: "Inserire data di nascita!" }]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );

  const articleModal = (
    <Modal
      visible={isAddModalVisible}
      title="Aggiungi un libro"
      okText="Aggiungi"
      cancelText="Indietro"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch((info) => {
            console.log("Validazione fallita:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: "public" }}>
        <Form.Item>
          <MyUpload></MyUpload>
        </Form.Item>
        <Form.Item label="Nome" name="name" rules={[{ required: true, message: "Inserire nome del libro!" }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="Venduto da" name="sellerId" rules={[{ required: true, message: "Inserire veniditore!" }]}>
          <Select>
            {users.map((user) => (
              <Option value={user.id}>{user.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );

  return kind === "users" ? userModal : articleModal;
};

export default MyModal;
