/**
 * Main entry point for the React application.
 * @module App
 */

import React from "react";
import { Provider } from "react-redux";
import store from "../Redux/store";
import Router from "./Route/Router";

/**
 * The root component of the application.
 * It provides the Redux store to the entire application and renders the Router component for navigation.
 * @component
 * @returns {JSX.Element} The root element of the application.
 */
const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
