import { useAuth } from "context/auth-context";
// import { FormEvent } from "react";
import { Form, Input, Button } from "antd";

export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    /* 
        - 先有事件：给到 onSubmit 的事件是 FormEvent<HTMLFormElement>
        - 再看事件处理函数：handleSubmit 的定义是要求的参数 evt 接口类型可以是FormEvent<HTMLFormElement> 的父类
        - 如此一来，实际的 event 是信息更完备的子类，可以传递给要求父类的 handleSubmit
    */
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
