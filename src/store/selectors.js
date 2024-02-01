export const selectTodos = ({ todos }) => todos;

export const selectIsLoading = ({ changesTodo }) => changesTodo.isLoading;
export const selectIsEditing = ({ changesTodo }) => changesTodo.isEditing;
export const selectIsDeleting = ({ changesTodo }) => changesTodo.isDeleting;
export const selectIsCreating = ({ changesTodo }) => changesTodo.isCreating;
export const selectIsCompleted = ({ changesTodo }) => changesTodo.isCompleted;

export const selectSearchTodo = ({ option }) => option.searchTodo;
export const selectSortTodoFlag = ({ option }) => option.sortTodoFlag;

export const selectIsEditItem = ({ editTodo }) => editTodo.isEditItem;
export const selectNewTitleTodo = ({ editTodo }) => editTodo.newTitleTodo;
