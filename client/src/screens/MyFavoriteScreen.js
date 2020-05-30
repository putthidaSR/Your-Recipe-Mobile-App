/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {SERVER_IP_ADDRESS, USER_KEY_STORAGE, Linking} from '../serverConfig';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';

export default class MyFavoriteScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      favoriteRecipesList: []
    };
  }

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
        this.getAllFavoriteRecipes();
      }    
    } catch (error) {
      console.log('Error getting username', error);
    }
  }

  getAllFavoriteRecipes = async () => {

    console.log('Attempt to fetch all favorite recipes');
    const URL = SERVER_IP_ADDRESS + '/favorites/' + this.state.username;
    console.log('Request URL', URL);

    try {
      const response = await axios.get(URL);
      if (response.data.status === 200) {
        this.setState({
          favoriteRecipesList: response.data.response
        });
      } else {
        console.log('Failed to get favorite recipes', response.data);
      }
    } catch (error) {
      console.log('Error fetching favorite recipes', error);
    }
  }

  render() {

    const viewRecipePrefixURL = SERVER_IP_ADDRESS + '/recipes/details/';


    return (
      <View style={styles.container}>
        <Text style={{padding: 20, fontSize: 20, fontWeight: 'bold', color: '#05b6ff'}}>List of Your Favorite Recipes</Text>
        {
          this.state.favoriteRecipesList.map((item, index) => {
            console.log(item.recipe_id);
            return (
              <ListItem
                title={'Recipe ID'}
                titleStyle={{fontSize: 14}}
                leftElement={
                  <Text>Recipe ID: {item.recipe_id}</Text>
                }
                rightElement={
                  <View style={{alignSelf: 'center', width: 200}}>
                    <Text key={index} style={{color: 'blue'}}
                      onPress={() => Linking.openURL('https://coronavirus.jhu.edu/map.html')}>
                      {viewRecipePrefixURL + item.recipe_id}
                    </Text>
                  </View>
                }                
                bottomDivider
              />
            );
          })
        }
      </View>
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
