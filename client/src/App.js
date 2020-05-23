import React from 'react';
import { View, Text } from 'react-native';
import InitialRouter from './routers/InitialRouter';

/**
 * The first component that the application will render when the app is loaded.
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // a flag to track if the app is still loading; true for loading
      isSignedIn: false // a flag to track if user is already logged in to the app
    };
  }

  render() {

    console.log('isSignedIn', this.state.isSignedIn);
    // TODO: Create splashing screen to check app loading
    if (this.state.isLoading) {
      <View><Text>Still loading...</Text></View>;
    }

    return (
      <InitialRouter />
    );

  }
}

export default App;
