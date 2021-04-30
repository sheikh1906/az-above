/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SkymapScreen from './src/skymap/SkymapScreen';
import SplashScreen from './src/startup/SplashScreen';

const App = createStackNavigator(
  {
    Splash: {screen: SplashScreen},
    Skymap: {screen: SkymapScreen},
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(App);
