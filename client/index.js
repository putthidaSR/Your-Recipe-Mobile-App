/**
 * This class represents the JS entry point to run React Native apps.
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Disable Yellow warning messsage box during debugging
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
