/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions, ActivityIndicator, Image} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_IP_ADDRESS, USER_KEY_STORAGE} from '../serverConfig';
import axios from 'axios';

import { Button } from 'react-native-elements';

export default class AccountScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // flag to indicate whether the screen is still loading
      username: '',
      cookingLevelStatus: ':('
    };
  }

  /**
   * Get initial data.
   */
  componentDidMount() {
    this.getUsername();
    this.getCookLevelStatus();
  }

  /***************************************************************
   * Get the username of the current logged-in user
  ****************************************************************/
  getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem(USER_KEY_STORAGE);
      if (value !== null) {
        this.setState({username: value});
      }    
    } catch (error) {
      console.log('Error getting username', error);
    }
  }

  /***************************************************************
   * Get the cooking status of the current logged-in user
  ****************************************************************/
  getCookLevelStatus = async() => {
    
    const URL = SERVER_IP_ADDRESS + '/users/stored/status/' + 'user_1';
    console.log('Request URL', URL);

    try {

      const response = await axios.get(URL);
      console.log(response.data);

      if (response.data.status === 200) {
        this.setState({
          isLoading: false, 
          cookingLevelStatus: response.data.data[0].UserCookingLevel
        });
      } else {
        console.log('Failed to get user status', response.data);
      }

    } catch (error) {
      console.log('Error retrieving user cooking status', error);
    }
  }

  /***************************************************************
   * Handle the action when user attempts to log out
  ****************************************************************/
  handleLogOut = () => {
    try {
      console.log('Successfully logging out');
      this.props.navigation.navigate('SignInScreen');
    } catch (error) {
      console.log('Error logging out', error);
    }
  }

  /***************************************************************
   * Render the text to display below user status image
  ****************************************************************/
  renderStatusTextView() {
    return (
      <View>
        <Text style={{marginBottom: 10, fontSize: 17, fontWeight: 'bold'}}>Your Current Cooking Status:</Text>
        <Text style={{fontSize: 17, color: '#05b6ff', fontWeight: 'bold', textAlign: 'center'}}>{this.state.cookingLevelStatus}{'\n\n'}</Text>
        <Text>{this.state.cookingLevelStatus === 'BEGINNER' ? 'Post more recipes to update your status... :)' 
          : 'Awesome! Keep posting more recipes...'}</Text>
      </View>
    );
  }
  /***************************************************************
   * Render the card view for user cooking status
  ****************************************************************/
  renderCookingLevelView() {

    return (
      <View>
        {this.state.cookingLevelStatus &&
          <Card
            title={<Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 10}}>Hi, {this.state.username}</Text>}
            image={this.state.cookingLevelStatus === 'BEGINNER' 
              ? require('./../assets/images/beginner.png')
              : this.state.cookingLevelStatus === 'AMATEUR' ? require('./../assets/images/amateur.png')
                : require('./../assets/images/expert.png')
            }
            imageProps={{resizeMode: 'contain'}}
          >
            {this.renderStatusTextView()} 
          </Card>
        }
      </View>
    );
  }
  
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{textAlign: 'center', marginTop: 20}}>We're fetching your data...</Text>
          <Text style={{textAlign: 'center'}}>Hold on tight...</Text>
        </View>
      );
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <View>

          <View style={{justifyContent: 'center', alignSelf: 'center'}}>
            {this.renderCookingLevelView()}
          </View>

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
