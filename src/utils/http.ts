import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

/* 此处的函数参数的解构赋值：
    const test = ({ q, w, ...e }) => { console.log(e);};
    const obj = { q: 1, w: 2, s: 3, k: 4 };
    test(obj)
    输出: {s: 3, k: 4} */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Coentent-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// useHTTP 这个 hook，很能体现 “自定义 hook 并未引入新的特性”，更多的是 函数-闭包 的性质
// 返回一个函数，该函数定义中带着 user.token 调用 http；当 user 改变时，闭包函数中的 http 的调用情况也跟着改变
// 换句话来说，即便 user 不是状态，是其他的一个引用值，这个值改变的时候，http 的调用情况也会改变
export const useHTTP = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
