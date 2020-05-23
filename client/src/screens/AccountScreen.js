import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';

import { Button } from 'react-native-elements';

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleLogOut = () => {
    try {
      console.log('Successfully logging out');
      this.props.navigation.navigate('SignInScreen');
    } catch (error) {
      console.log('Error logging out', error);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Button type="solid" title="LOGOUT"
            titleStyle={{fontSize: 15, fontWeight: 'bold'}}
            containerStyle={{width: (Dimensions.get('window').width) - 50, alignSelf: 'center', paddingBottom: 15, paddingTop: 15}}
            buttonStyle={{
              borderWidth: 3,
              borderColor: 'white',
              borderRadius:15, 
              shadowOffset: {width: 5, height: 5},
              shadowColor: 'rgba(0,0,0,1)',
              shadowOpacity: 0.43,
              height: 55
            }}
            onPress={this.handleLogOut} 
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});