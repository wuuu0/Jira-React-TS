export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form>
      <div>
        <input
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
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
