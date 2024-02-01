import styles from './app.module.css';
import { useTodo } from './hooks/use-todo';
import { selectIsDeleting, selectIsCompleted } from './store/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const TodoItem = ({ id, title, completed }) => {
	const isDeleting = useSelector(selectIsDeleting);
	const isCompleted = useSelector(selectIsCompleted);

	const [isEditItem, setIsEditItem] = useState(false);
	const [newTitleTodo, setNewTitleTodo] = useState(title);

	const { requestEditTodo, requestDeleteTodo, requestCompletedTodo } = useTodo(
		id,
		newTitleTodo,
	);

	const handleEditItem = () => setIsEditItem((prevState) => !prevState);

	return (
		<>
			{!isEditItem ? (
				<div className={styles.todo}>
					<div>
						{title} - {completed === 'true' ? 'выполнено' : 'не выполнено'}
					</div>
					<button
						className={styles.button}
						onClick={() => {
							handleEditItem();
						}}
					>
						Изменить дело
					</button>
					<button
						className={styles.button}
						disabled={isCompleted}
						onClick={() => requestCompletedTodo(id)}
					>
						Выполнить дело
					</button>
					<button
						className={styles.button}
						disabled={isDeleting}
						onClick={() => requestDeleteTodo(id)}
					>
						Удалить дело
					</button>
				</div>
			) : (
				<div className={styles.todo}>
					<input
						value={newTitleTodo}
						type="text"
						onChange={(e) => {
							setNewTitleTodo(e.currentTarget.value);
						}}
					/>
					<button
						className={styles.button}
						onClick={() => {
							requestEditTodo(id, newTitleTodo);
							handleEditItem();
						}}
					>
						Сохранить изменения
					</button>
					<button
						className={styles.button}
						onClick={() => {
							setNewTitleTodo(title);
							handleEditItem();
						}}
					>
						Отменить изменения
					</button>
				</div>
			)}
		</>
	);
};
