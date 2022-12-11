import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
// import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHTTP } from "utils/http";

// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const decounceParam = useDebounce(param, 200);
  const client = useHTTP();

  useEffect(() => {
    client("projects", { data: cleanObject(decounceParam) }).then(setList);
  }, [decounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
