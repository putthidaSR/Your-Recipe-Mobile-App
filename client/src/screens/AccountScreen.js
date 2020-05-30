/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions, ActivityIndicator, Image} from 'react-native';
import { Card } from 'react-native-elements';
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
      cookingLevelStatus: ':(',
      numOfPostedRecipe: 0
    };
  }

  /**
   * Get initial data.
   */
  componentDidMount() {
    this.getUsername();
  }

  /***************************************************************
   * Get the username of the current logged-in user
  ****************************************************************/
  getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem(USER_KEY_STORAGE);
      if (value !== null) {
        this.setState({username: value});

        this.getCookLevelStatus();
        this.getTotalNumRecipesPosted();
      }    
    } catch (error) {
      console.log('Error getting username', error);
    }
  }

  /***************************************************************
   * Get the cooking status of the current logged-in user
  ****************************************************************/
  getCookLevelStatus = async() => {
    
    const URL = SERVER_IP_ADDRESS + '/users/stored/status/' + this.state.username;
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

  /*********************************************************************
   * Return the total number of recipes that the current user is posted.
  **********************************************************************/
  getTotalNumRecipesPosted = async() => {

    console.log('Attempt to send request to get recipe summary list');
    const URL = SERVER_IP_ADDRESS + '/recipes/' + this.state.username;
    console.log('Request URL', URL);

    try {
      const response = await axios.get(URL);
      this.setState({isLoading: false});

      if (response.data.status === 200) {
        this.setState({numOfPostedRecipe: response.data.response.length});
      } else {
        console.log('Failed to get user status', response.data);
      }
    } catch (error) {
      console.log('Error getting recipe summary list', error);
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
        <Text style={styles.titleText}>Your Current Cooking Status</Text>
        <Text style={styles.subtitleText}>{this.state.cookingLevelStatus}{'\n\n'}</Text>
        <Text style={styles.titleText}>Total Number Of Recipes You Have Posted</Text>
        <Text style={styles.subtitleText}>{this.state.numOfPostedRecipe} Recipe{this.state.numOfPostedRecipe.length > 1 ? 's' : ''}{'\n\n'}</Text>
        <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'gray'}}>{this.state.cookingLevelStatus === 'BEGINNER' ? 'Post more recipes to update your status... :)' 
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
            title={<Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', padding: 10}}>Hi, {this.state.username}</Text>}
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
            containerStyle={{width: (Dimensions.get('window').width) - 60, alignSelf: 'center', paddingBottom: 15, paddingTop: 15}}
            buttonStyle={{
              borderWidth: 3,
              borderColor: 'white',
              borderRadius:15,
              height: 55,
              backgroundColor: '#05b6ff'
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
  titleText: {
    marginBottom: 10, fontSize: 17, fontWeight: 'bold', textAlign: 'center'
  },
  subtitleText: {
    fontSize: 17, color: '#05b6ff', fontWeight: 'bold', textAlign: 'center'
  }
});
