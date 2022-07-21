import { Input, InputNumber, DatePicker, Form, Select } from "antd";
import React from "react";
import { useStore } from "../Store.ts";

const { Option } = Select;

const EditableCell: React.FC = ({ editing, dataIndex, title, inputType, item, index, children, ...restProps }) => {
  const { users } = useStore();
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  if (dataIndex === "createdAt") {
    return <td {...restProps}>{children}</td>;
  }

  if (dataIndex === "birthdate") {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item label="Data di nascita" name="birthdate" rules={[{ required: true, message: "Inserire data di nascita!" }]}>
            <DatePicker />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }

  if (dataIndex === "sellerId") {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item label="Venditore" name="sellerId" rules={[{ required: true, message: "Inserire venditore!" }]}>
            <Select>
              {users.map((user) => (
                <Option value={user.id}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }

  if (dataIndex === "name") {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              { required: true, message: "Inserire nome!" },
              { pattern: /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/gm, message: "Nome non valido!" },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Inserire ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
