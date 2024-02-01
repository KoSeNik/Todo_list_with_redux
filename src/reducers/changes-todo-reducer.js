const initialState = {
	isLoading: false,
	isEditing: false,
	isDeleting: false,
	isCreating: false,
	isCompleted: false,
};

export const changesTodoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_IS_LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		case 'SET_IS_EDITING': {
			return {
				...state,
				isEditing: payload,
			};
		}
		case 'SET_IS_DELETING': {
			return {
				...state,
				isDeleting: payload,
			};
		}
		case 'SET_IS_CREATING': {
			return {
				...state,
				isCreating: payload,
			};
		}

		case 'SET_IS_COMPLETED': {
			return {
				...state,
				isCompleted: payload,
			};
		}
		default:
			return state;
	}
};
