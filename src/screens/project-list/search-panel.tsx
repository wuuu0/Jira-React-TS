/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";

interface SearchPanelProps {
  users: User[];
  param: { name: string; personId: string };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          // 注意: useState 和 this.state & setState 的局部更新合并的区别
          // this.state 对象保存所有的状态项，setState 可以局部更新其中某一项
          // useState 一次声明一个状态项，该状态项本身可以是一个对象，更新的时候要传入完整的对象，不能少字段
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
