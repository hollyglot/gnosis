import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

import ReduxDevTools from '../dev/ReduxDevTools';
import logger from '../dev/logger';

const storeEnhancers = compose(
  applyMiddleware(thunk, logger),
  ReduxDevTools.instrument()
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, storeEnhancers);
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }
  return { store };
}
