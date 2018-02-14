import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Table from './components/table/Table';
import FilterComponent from './components/filter/FilterComponent';
import musicApp from './reducers';

//eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(musicApp, {}, enhancer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Table />
          <FilterComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
