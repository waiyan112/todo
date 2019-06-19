import React, { PureComponent } from "react";
import Routes from "./src/Routes";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import appReducer from "./src/redux/reducers/index";

const store = createStore(appReducer, applyMiddleware(thunk));

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
