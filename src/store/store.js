import {
	combineReducers,
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
	todosReducer,
	changesTodoReducer,
	optionReducer,
	editTodoReducer,
} from '../reducers';

const reducer = combineReducers({
	todos: todosReducer,
	changesTodo: changesTodoReducer,
	option: optionReducer,
	editTodo: editTodoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
