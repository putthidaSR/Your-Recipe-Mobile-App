import React, { Component } from 'react'	;
import { StyleSheet, Text, Alert, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import axios from 'axios';
import {SERVER_IP_ADDRESS} from '../../serverConfig';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignInForm extends Component {

  constructor(props) {

    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
    this.handleSignInUser = this.handleSignInUser.bind(this);
  }

  /**
   * Check if user is successfully logged in to the app.
   */
  async handleSignInUser() {
    
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      Alert.alert(
        'Failed to Sign-in',
        '\nUsername and Password must not be empty.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }

    const URL = SERVER_IP_ADDRESS + '/users/' + this.state.username + '/' + this.state.password;
    console.log('Request URL', URL);

    try {

      const response = await axios.get(URL);
      console.log(response.data);

      if (response.data.status !== 200) {
        console.log('User not found', response.data.response);
        Alert.alert(
          'Failed to Sign-in',
          response.data.response,
          [{ text: 'OK' }],
          { cancelable: false },
        );

      } else {

        await AsyncStorage.setItem('USER_KEY', this.state.username);

        // At this point, user is authenticated. Navigate to homescreen of the main application.
        this.props.navigation.navigate('Homepage', {username : this.state.username});
      }

    } catch (error) {
      console.log('Error sign-in user', error);
      this.setState({ errorMessage: error.message });

      Alert.alert(
        'Failed to Sign-in',
        error.message,
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

  }

  render() {

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder = "Username"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          autoCapitalize = "none"
          autoCorrect = {false}
          returnKeyType = "next"
          onChangeText = {(username) => this.setState({username})}
          value = {this.state.username}
          onFocus = { () => this.setState({username: ''})}
          underlineColorAndroid = "#fff"
        />
        <TextInput
          style={styles.input}
          placeholder = "Password"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          autoCapitalize = "none"
          secureTextEntry = {true}
          onChangeText = {(password) => this.setState({password})}
          value = {this.state.password}
          onFocus = { () => this.setState({password: ''})}
          underlineColorAndroid = "#fff"
        />
        
        <TouchableOpacity
          onPress={this.handleSignInUser}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={{width: Dimensions.get('window').width - 50, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 30}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text style={{color: 'white', backgroundColor: 'transparent'}}>Create Account</Text>
          </TouchableOpacity>
        </View>
        
      </View>

    );
  }
}
	
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    width: Dimensions.get('window').width - 50,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 20,
    borderRadius: 20
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    borderRadius: 20
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
