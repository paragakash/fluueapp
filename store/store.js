import { createStore,applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootreducer from './reducers/rootreducer'
import { composeWithDevTools } from 'redux-devtools-extension';

//export const store = createStore(rootreducer,applyMiddleware(thunk,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
export const store = createStore(rootreducer,composedEnhancer)