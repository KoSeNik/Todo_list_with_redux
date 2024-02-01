import styles from '../app.module.css';

export const getTodos = (isLoading) => (dispatch) => {
	dispatch({ type: 'SET_IS_LOADING', payload: true });

	fetch(`http://localhost:3005/todos`)
		.then((loadedData) => loadedData.json())
		.then((loadedTodos) => {
			dispatch({ type: 'SET_TODOS', payload: loadedTodos });
		})
		.finally(() => {
			dispatch({ type: 'SET_IS_LOADING', payload: false });
		});
	return isLoading ? (
		<div className={styles.loader}></div>
	) : (
		{
			getTodos,
		}
	);
};
