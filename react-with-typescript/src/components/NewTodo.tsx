import React, { useRef } from "react";

type onAddTodoProps = {
	onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FC<onAddTodoProps> = ({ onAddTodo }) => {
	const textInputRef = useRef<HTMLInputElement>(null);

	const todoSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const enteredText = textInputRef.current!.value;
		onAddTodo(enteredText);
	};

	return (
		<form onSubmit={todoSubmitHandler}>
			<div>
				<label htmlFor="todo-next">Todo Text</label>
				<input type="text" id="todo-text" ref={textInputRef} />
			</div>
			<button type="submit">ADD TODO</button>
		</form>
	);
};

export default NewTodo;
