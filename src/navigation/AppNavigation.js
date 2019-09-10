import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
//Main navigator for home screen.
const MainNavigator = createStackNavigator({
  Home: { screen: Home },
});

export default createAppContainer(MainNavigator);