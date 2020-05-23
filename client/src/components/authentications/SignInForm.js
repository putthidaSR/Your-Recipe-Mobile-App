import React, { Component } from 'react'	;
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';

export default class SignInForm extends Component {

  constructor(props) {

    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleSignInUser = this.handleSignInUser.bind(this);
  }

  /**
   * Check if user is successfully logged in to the app.
   */
  async handleSignInUser() {
    
    try {

      console.log('User is successfully logged in');

      // At this point, user is authenticated. Navigate to homescreen of the main application.
      this.props.navigation.navigate('Homepage', this.state.email);

    } catch (error) {
      console.log('Error sign-in user', error);
      this.setState({ errorMessage: error.message });
    }

  }

  render() {

    return (
      <View style={styles.container}>

        <Text>
          {this.state.errorMessage}
        </Text>

        <TextInput
          style={styles.input}
          placeholder = "Email Address or Username"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          autoCapitalize = "none"
          autoCorrect = {false}
          returnKeyType = "next"
          onChangeText = {(email) => this.setState({email})}
          value = {this.state.email}
          onFocus = { () => this.setState({email: ''})}
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
