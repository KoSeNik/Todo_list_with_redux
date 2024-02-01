const initialState = {
	isEditItem: false,
	newTitleTodo: '',
};

export const editTodoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_IS_EDIT_ITEM': {
			return {
				...state,
				payload,
			};
		}
		case 'SET_NEW_TITLE_TODO': {
			return {
				...state,
				payload,
			};
		}

		default:
			return state;
	}
};
