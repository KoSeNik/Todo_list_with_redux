const initialState = [];

export const todosReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_TODOS':
			return payload;

		default:
			return state;
	}
};
