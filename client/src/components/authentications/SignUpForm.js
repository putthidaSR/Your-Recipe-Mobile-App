import React, { Component } from 'react';
import { StyleSheet, Alert, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';

import axios from 'axios';
import {SERVER_IP_ADDRESS} from '../../serverConfig';

export default class SignUpForm extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      password: '',
      email: '',
      username: '',
      errorMessage: ''
    };

    this.handleSignUpUser = this.handleSignUpUser.bind(this);
  }
  
  async handleSignUpUser() {

    const { username, password, email } = this.state;
    if (username.length === 0 || password.length === 0) {
      Alert.alert(
        'Failed to Sign-up',
        '\nUsername and Password must not be empty.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }

    const URL = SERVER_IP_ADDRESS + '/users/';
    console.log('POST Request URL', URL);

    try {

      const response = await axios.post(URL, {
        username: username,
        password: password,
        email: email
      });

      console.log('response', response);
      if (response.data.status !== 200) {
        console.log('Failed to sign up', response.data.response);
        Alert.alert(
          'Failed to Sign-up',
          response.data.response,
          [{ text: 'OK' }],
          { cancelable: false },
        );
        return;
      }

      // Navigate to sign-in screen so that user can sign up with the newly created credentials
      console.log('Successfully sign up!');
      this.props.navigation.navigate('SignInScreen');

    } catch (error) {

      console.log('Error signing up: ', error);
      this.setState({ errorMessage: error.message });

      Alert.alert(
        'Failed to Sign Up',
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
          style = {styles.input}
          onChangeText = {(username) => this.setState({username})}
          placeholder = "User Name"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          autoCapitalize = "none"
          autoCorrect = {false}
          returnKeyType = "next"
          onFocus = { () => this.setState({username: ''})}
          underlineColorAndroid = "#fff"
        />
        <TextInput
          style = {styles.input}
          onChangeText = {(password) => this.setState({password})}
          placeholder = "Password"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          autoCapitalize = "none"
          autoCorrect = {false}
          returnKeyType = "next"
          onFocus = { () => {
            this.setState({password: ''});
            this.setState({errorMessage: 'Passwords must contain uppercase and at least 6 characters length'});
          }}
          secureTextEntry = { true }
          underlineColorAndroid = "#fff"
        />

        <TextInput
          style = {styles.input}
          onChangeText = {(email) => this.setState({email})}
          placeholder = "Email Address"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          autoCapitalize = "none"
          autoCorrect = {false}
          returnKeyType = "next"
          onFocus = { () => this.setState({email: ''})}
          keyboardType = "email-address"
          underlineColorAndroid = "#fff"
        />

        <TouchableOpacity
          onPress = {this.handleSignUpUser}
          style = {styles.buttonContainer}
        >
          <Text style = {styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>

        <View style={styles.signUpSectionContainer}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInScreen')}>
            <Text style={styles.textLink}>Already has an account?</Text>
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
  },
  textLink: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  signUpSectionContainer: {
    width: Dimensions.get('window').width - 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    marginBottom: 50
  },
});
