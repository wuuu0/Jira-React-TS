import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const LoginScreen = () => {
  const { login, user } = useAuth();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };
  return (
    /* 
        - 先有事件：给到 onSubmit 的事件是 FormEvent<HTMLFormElement>
        - 再看事件处理函数：handleSubmit 的定义是要求的参数 evt 接口类型可以是FormEvent<HTMLFormElement> 的父类
        - 如此一来，实际的 event 是信息更完备的子类，可以传递给要求父类的 handleSubmit
    */
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
