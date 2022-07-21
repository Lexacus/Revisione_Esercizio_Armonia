import { Form, Popconfirm, Table, Button, Space, Image } from "antd";
import moment from "moment";
import React, { useState } from "react";
import Api from "../Api.ts";
import { useStore } from "../Store.ts";
import ArticlesTable from "./ArticlesTable.tsx";
import EditableCell from "./EditableCell.tsx";

const UsersTable = ({ users }) => {
  const { setUsers, articles } = useStore();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (item) => item.id === editingKey;

  const edit = (item) => {
    form.setFieldsValue({
      ...item,
      birthdate: moment(item.birthdate).isValid() ? moment(item.birthdate) : moment(),
    });
    setEditingKey(item.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...users];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await Api.modifyUser(id, row);
        const newUsers = await Api.getUsers();
        setUsers(newUsers);
        setEditingKey("");
      } else {
        newData.push(row);
        setUsers(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const userColumns = [
    { key: "id", title: "ID", dataIndex: "id", align: "center" as "center" },
    {
      key: "avatar",
      title: "Avatar",
      align: "center" as "center",
      render: (item) => <Image src={item.avatar} alt="Avatar" className="avatarandpictures" />,
    },
    {
      key: "name",
      title: "Nome e Cognome",
      dataIndex: "name",
      align: "center" as "center",
      editable: true,
    },
    {
      key: "birthdate",
      title: "Data di nascita",
      dataIndex: "birthdate",
      align: "center" as "center",
      render: (_, item) => <span>{moment(item.birthdate, "YYYY-MM-DD" || "YYYY/MM/DD").format("DD/MM/YYYY")}</span>,
      editable: true,
    },
    {
      key: "createdAt",
      title: "Data creazione account",
      dataIndex: "createdAt",
      align: "center" as "center",
      render: (_, item) => <span>{moment(item.createdAt, "YYYY-MM-DD" || "YYYY/MM/DD").format("DD/MM/YYYY")}</span>,
      editable: true,
    },
    Table.EXPAND_COLUMN,
    {
      key: "actions",
      title: "Azioni",
      dataIndex: "actions",
      align: "center" as "center",
      colSpan: 2,
      render: (_, item, index) => {
        const editable = isEditing(item);
        return editable ? (
          <span>
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
          </span>
        ) : (
          <Space>
            <Button disabled={editingKey !== ""} onClick={() => edit(item)}>
              Modifica
            </Button>
            <Button
              disabled={editingKey !== ""}
              onClick={async () => {
                await Api.deleteUser(item.id);
                const newUsers = await Api.getUsers();
                setUsers(newUsers);
              }}
            >
              Cancella
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedUserColumns = userColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (item) => {
        return {
          item,
          inputType: col.dataIndex === "birthdate" ? "date" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(item),
        };
      },
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={users}
        columns={mergedUserColumns}
        rowKey={(item) => item.id}
        expandable={{
          expandedRowRender: (item) => <ArticlesTable articles={articles.filter((x) => x.sellerId === item.id.toString())}></ArticlesTable>,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <Button disabled={editingKey !== ""} onClick={(e) => onExpand(record, e)}>
                Chiudi
              </Button>
            ) : (
              <Button disabled={editingKey !== ""} onClick={(e) => onExpand(record, e)}>
                Visualizza Articoli
              </Button>
            ),
        }}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default UsersTable;
