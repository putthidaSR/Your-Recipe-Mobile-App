/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_IP_ADDRESS, USER_KEY_STORAGE} from '../serverConfig';
import axios from 'axios';
import { Overlay, Card, Button, Divider } from 'react-native-elements';

import {VIEW_ONE_RECIPE_WITH_DETAILS, VIEW_POSTED_RECIPES_DATA} from './../utilities/SampleTestData';

export default class ViewMyRecipes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullRecipeData: {},
      totalRecipesUploaded: 0,
      recipeSummaryList: [],
      recipeId: 0,
      username: '',

      showViewFullRecipeModal: false
    };
  }

  componentDidMount() {
    this.getUsername();
    this.getRecipeSummaryList();
  }


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

  getRecipeSummaryList = async() => {

    console.log('Attempt to send request to get recipe summary list');

    try {
      this.setState({
        recipeSummaryList: VIEW_POSTED_RECIPES_DATA.data,
        totalRecipesUploaded: VIEW_POSTED_RECIPES_DATA.data.length
      });
    } catch (error) {
      console.log('Error getting recipe summary list', error);
    }
  } 

  handleEditRecipeName = async() => {

    console.log('Attempt to edit recipe name');
    
    const URL = SERVER_IP_ADDRESS + '/recipes/' + this.state.recipeId;
    console.log('Request URL', URL);

    try {

    } catch (error) {
      console.log(error);
    }
  }

  handleDeleteRecipe = async() => {

    console.log('Attempt to delete a recipe');

    const URL = SERVER_IP_ADDRESS + '/recipes/' + this.state.recipeId;
    console.log('Request URL', URL);

    try {

    } catch (error) {
      console.log(error);
    }
  }

  handleViewFullRecipe = async() => {

    console.log('Attempt to send request to view full recipe');

    try {
      this.setState({
        fullRecipeData: VIEW_ONE_RECIPE_WITH_DETAILS,
        showViewFullRecipeModal: true
      });

    } catch (error) {
      console.log(error);
    }
  }

  renderViewFullRecipe() {
    return (
      <Overlay 
        isVisible={this.state.showViewFullRecipeModal}
        overlayStyle={{
          width: Dimensions.get('window').width - 50,
          height: Dimensions.get('window').height > 800 
            ? Dimensions.get('window').height - 350
            : Dimensions.get('window').height - 200
        }}
        onBackdropPress={() => {
          this.setState({showViewFullRecipeModal: true});
        }}
      >
        <View style={{marginTop: 100}}>
          <ScrollView contentContainerStyle={{height: LIST_VIEW_HEIGHT * 2}}>
            <Text>{this.state.fullRecipeData.recipeName}</Text>
            <Text>Recipe Origin: {this.state.fullRecipeData.origin}</Text>
            <Text>Time Needed: {this.state.fullRecipeData.timeNeeded}</Text>
            <Text>Difficulty Level: {this.state.fullRecipeData.difficultyLevel}</Text>

            <Text>Food Types: {this.state.fullRecipeData.foodTypes}</Text>
            <Text>Diet Types: {this.state.fullRecipeData.dietTypes}</Text>
          </ScrollView>
          
        </View>
        

        <Button
          containerStyle={{padding: 5, width: 300, alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 10}}
          titleStyle={{fontSize: 17, fontWeight: 'bold'}}
          buttonStyle={{borderRadius: 20, marginRight: 0, marginBottom: 0}}
          title="Close" 
          onPress={() => this.setState({showViewFullRecipeModal: false})}                
        />

      </Overlay>
    );
  }

  renderTitleView() {
    return (
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <Text style={{...styles.titleStyle, paddingTop: 20}}>You have posted</Text>
        <Text style={{...styles.titleStyle}}>{this.state.totalRecipesUploaded} recipe{this.state.totalRecipesUploaded > 1 ? 's' : ''}!
        </Text>
      </View>
    );
  }
  renderRecipeList() {

    return (
      <View>
        {
          this.state.recipeSummaryList.map((data, index) => (
            <Card
              title={data.recipeName}
              key={index}
              containerStyle={{width: Dimensions.get('window').width - 40, borderRadius: 30}}
            >
              <View style={{padding: 5}} />
              <Button
                icon={<Icon name="md-open" color="#fff" size={20} />}
                containerStyle={{padding: 5}}
                titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                buttonStyle={{backgroundColor: '#05b6ff', borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title="   View Full Recipe"
                onPress={this.handleViewFullRecipe}
              />
              {this.renderViewFullRecipe()}
              
              <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 100}}>
                <Button
                  icon={<Icon name="md-create" color="#fff" size={20} />}
                  containerStyle={{padding: 5, width: 172}}
                  titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                  buttonStyle={{backgroundColor: 'green', borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title="  Edit" 
                  onPress={this.handleEditRecipeName}
                />

                <Button
                  icon={<Icon name="ios-trash" color="#fff" size={20} />}
                  containerStyle={{padding: 5, width: 172}}
                  titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                  buttonStyle={{backgroundColor: 'red', borderRadius: 20, marginRight: 0, marginBottom: 0}}
                  title="  Delete" 
                  onPress={this.handleDeleteRecipe}
                />
              </View>

              <Text style={{textAlign: 'right', padding: 5, marginTop: 5}}>Last Updated: {data.latestUpdate}</Text>
            </Card>
            
          ))
        }
      </View>
    );
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.topViewContainer} >
          {this.renderTitleView()}
        </View>

        <View style={styles.listViewContainer}>
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{height: LIST_VIEW_HEIGHT * 10}}>
            {this.renderRecipeList()}
          </ScrollView>
        </View>

      </SafeAreaView>
    );
  }
}

const WHOLE_HEIGHT_VIEW = Dimensions.get('window').height;
const TOP_VIEW_HEIGHT = WHOLE_HEIGHT_VIEW / 3;
const LIST_VIEW_HEIGHT = 2 * WHOLE_HEIGHT_VIEW / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollViewContainer: {
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  topViewContainer: {
    alignSelf: 'center', 
    backgroundColor: '#05b6ff', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: Dimensions.get('window').width, 
    height: TOP_VIEW_HEIGHT - 100,
    flex: 0.2
  },
  listViewContainer: {
    flex: 0.9,
    justifyContent: 'center',
    height: LIST_VIEW_HEIGHT,
    width: Dimensions.get('window').width,
    position:'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  buttonContainer: {
    borderRadius: 10
  },
  titleStyle: {
    fontFamily: 'AmericanTypewriter-Bold', 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FFF'
  }

});
