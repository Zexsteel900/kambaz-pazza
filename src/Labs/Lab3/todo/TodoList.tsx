import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <>
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos.map((task) => {
          return <TodoItem todo={task} />;
        })}
      </ul>
      <hr />
    </>
  );
}
