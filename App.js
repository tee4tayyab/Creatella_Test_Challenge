/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigation from './src/navigation/AppNavigation'
import { Provider } from 'react-redux';
import configureStore from './src/store/store';


// get REDUX STORE
const store = configureStore()
// Providing Redux store to Root Navigator to access STORE throughout the application
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
