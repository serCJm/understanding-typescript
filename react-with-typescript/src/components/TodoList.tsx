import * as React from "react";

type TodoListProps = {
	items: {
		id: string;
		text: string;
	}[];
};

const TodoList: React.FC<TodoListProps> = ({ items }) => {
	return (
		<ul>
			{items.map((todo) => (
				<li key={todo.id}>{todo.text} </li>
			))}
		</ul>
	);
};

export default TodoList;
