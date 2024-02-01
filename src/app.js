import styles from './app.module.css';
import { TodoItem } from './todoItem';
import { useTodo } from './hooks/use-todo';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTodos,
	selectIsLoading,
	selectIsCreating,
	selectSortTodoFlag,
} from './store/selectors';
import { useEffect, useState } from 'react';
import { getTodos } from './actions/get-todos';

export const App = () => {
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectIsLoading);
	const isCreating = useSelector(selectIsCreating);
	const sortTodoFlag = useSelector(selectSortTodoFlag);
	const dispatch = useDispatch();
	const { requestAddTodo } = useTodo();

	const [searchTodo, setSearchTodo] = useState('');
	const handleSearch = ({ target }) => {
		setSearchTodo(target.value);
	};

	const filterTodos = todos.filter((todo) => todo.title.includes(searchTodo));

	const sortTodo = () => {
		const copyData = filterTodos.slice();
		const sortData = copyData.sort((a, b) => a.title.localeCompare(b.title));
		dispatch({ type: 'SET_TODOS', payload: sortData });
		dispatch({ type: 'SET_SORT_TODO_FLAG', payload: true });
	};

	const addTodo = () => {
		dispatch({ type: 'SET_SORT_TODO_FLAG', payload: false });
		requestAddTodo();
	};

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<div>Список дел</div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				filterTodos.map(({ id, title, completed }) => (
					<TodoItem key={id} id={id} title={title} completed={completed} />
				))
			)}
			<button disabled={isCreating} onClick={addTodo} className={styles.button}>
				Добавить дело
			</button>
			<input value={searchTodo} onChange={handleSearch} placeholder="Поиск дела" />
			<button
				onClick={sortTodo}
				className={`${styles.button} ${sortTodoFlag ? styles.buttonPressed : ''}`}
			>
				Сортировка дел по алфавиту
			</button>
		</div>
	);
};
