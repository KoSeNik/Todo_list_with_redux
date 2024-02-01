import styles from '../app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTodos,
	selectIsLoading,
	selectIsEditing,
	selectIsDeleting,
	selectIsCreating,
	selectIsCompleted,
} from '../store/selectors';

export const useTodo = () => {
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectIsLoading);
	const isEditing = useSelector(selectIsEditing);
	const isDeleting = useSelector(selectIsDeleting);
	const isCreating = useSelector(selectIsCreating);
	const isCompleted = useSelector(selectIsCompleted);

	const dispatch = useDispatch();

	const requestEditTodo = (id, newTitleTodo) => {
		dispatch({ type: 'SET_IS_EDITING', payload: true });
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTitleTodo,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело изменено, ответ сервера:', response);
				const updateTodos = todos.slice();
				const indexTodo = todos.findIndex((todo) => todo.id === id);
				updateTodos[indexTodo] = response;
				dispatch({ type: 'SET_TODOS', payload: updateTodos });
			})
			.finally(() => {
				dispatch({ type: 'SET_IS_EDITING', payload: false });
			});
		return {
			isEditing,
			requestEditTodo,
		};
	};

	const requestDeleteTodo = (id) => {
		dispatch({ type: 'SET_IS_DELETING', payload: true });
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено, ответ сервера:', response);
				dispatch({
					type: 'SET_TODOS',
					payload: todos.filter((todo) => todo.id !== id),
				});
			})
			.finally(() => dispatch({ type: 'SET_IS_DELETING', payload: false }));
		return {
			isDeleting,
			requestDeleteTodo,
		};
	};

	const requestAddTodo = () => {
		dispatch({ type: 'SET_IS_CREATING', payload: true });
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'новое дело',
				completed: 'false',
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Добавлено новое дело, ответ сервера:', response);
				dispatch({ type: 'SET_TODOS', payload: [...todos, response] });
			})
			.finally(() => {
				dispatch({ type: 'SET_IS_CREATING', payload: false });
			});
		return {
			isCreating,
			requestAddTodo,
		};
	};

	const requestCompletedTodo = (id) => {
		dispatch({ type: 'SET_IS_COMPLETED', payload: true });
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: 'true',
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело сделано, ответ сервера:', response);
				const updateTodos = todos.slice();
				const indexTodo = todos.findIndex((todo) => todo.id === id);
				updateTodos[indexTodo] = response;
				dispatch({ type: 'SET_TODOS', payload: updateTodos });
			})
			.finally(() => dispatch({ type: 'SET_IS_COMPLETED', payload: false }));
		return {
			isCompleted,
			requestCompletedTodo,
		};
	};

	return isLoading ? (
		<div className={styles.loader}></div>
	) : (
		{
			requestEditTodo,
			requestDeleteTodo,
			requestAddTodo,
			requestCompletedTodo,
		}
	);
};
