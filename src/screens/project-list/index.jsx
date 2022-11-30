import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} />
      <List list={list} />
    </div>
  );
};
