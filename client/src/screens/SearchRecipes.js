/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ListItem } from 'react-native-elements';

import {RECIPE_DATA} from './../utilities/SampleTestData';
/**
 * View all recipes from any users
 */
export default class SearchRecipes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      recipesList: RECIPE_DATA.data
    };
    
  }

  componentDidMount() {
    //this.getInitialData();
  }

  async getInitialData() {

    try {

    } catch (error) {

    }
  }

  renderRecipeList() {
    return (
      <View style={{justifyContent: 'center', marginTop: 100}}>
        {
          this.state.recipesList.map((data, index) => (
            <ListItem
              key={index}
              title={data.recipeName}
              subtitle={data.origin}
              bottomDivider
            />
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>


        {this.renderRecipeList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
