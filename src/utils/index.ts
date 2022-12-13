import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete res[key];
    }
  });
  return res;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/* 结合闭包的知识，useDebounce 的参数变量 value 在 useDebounce 调用完成后，
会持续存在于函数的活动对象中，所以能够持续追踪 value 参数变量的变化 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
