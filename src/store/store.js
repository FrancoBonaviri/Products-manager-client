import { createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer
})



export const store = createStore(reducers);


