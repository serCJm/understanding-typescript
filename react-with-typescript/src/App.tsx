import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const todoAddHandler = (text: string) => {
		setTodos((prevState) => [
			...prevState,
			{ id: Math.random().toString(), text },
		]);
	};

	const onDeleteHandler = (textId: string) => {
		setTodos((prevState) => prevState.filter((todo) => todo.id !== textId));
	};

	return (
		<div className="App">
			<NewTodo onAddTodo={todoAddHandler}></NewTodo>
			<TodoList items={todos} onDeleteTodo={onDeleteHandler}></TodoList>
		</div>
	);
};

export default App;
