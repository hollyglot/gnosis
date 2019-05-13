import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const storeEnhancers = compose(
  applyMiddleware(thunk),
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, storeEnhancers);
  return { store };
}
