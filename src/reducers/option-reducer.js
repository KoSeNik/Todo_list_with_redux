const initialState = {
	searchTodo: '',
	sortTodoFlag: false,
};

export const optionReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_SEARCH_TODO': {
			return {
				...state,
				payload,
			};
		}
		case 'SET_SORT_TODO_FLAG': {
			return {
				...state,
				payload,
			};
		}

		default:
			return state;
	}
};
