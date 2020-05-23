import React from 'react';
import { View } from 'react-native';
import InitialRouter from './routers/InitialRouter';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text } from '@ui-kitten/components';

/**
 * The first component that the application will render when the app is loaded.
 */
export default class App extends React.Component {

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
      <ApplicationProvider {...eva} theme={eva.light}>
        <InitialRouter />
      </ApplicationProvider>
    );
  }
}

