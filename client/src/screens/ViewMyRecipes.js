/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView, Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_IP_ADDRESS, USER_KEY_STORAGE} from '../serverConfig';
import axios from 'axios';
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton, ScaleAnimation, } from 'react-native-modals';
import { Overlay, Card, Button, ListItem } from 'react-native-elements';
import {TextField} from 'react-native-ui-lib';
import moment from 'moment';

export default class ViewMyRecipes extends Component {

  constructor(props) {
    super(props);

    this.state = {

      isLoading: false, // flag to indicate whether the screen is still loading

      totalRecipesUploaded: 0,
      recipeSummaryList: [],
      targetedRecipeId: 0,
      username: '',
      newRecipeName: '',

      showViewFullRecipeModal: false,
      showViewEditRecipeModal: false,
      showDeleteRecipeModal: false,

      recipeDetails: {
        countryName: '',
        timeNeeded: '',
        difficultyLevel: '',
        dietType: [],
        foodType: [],
        ingredients: [],
        cookingSteps: []
      }
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
        this.getRecipeSummaryList();
      }    
    } catch (error) {
      console.log('Error getting username', error);
    }
  }

  /***************************************************************
   * Get the initial summary data of each recipe. 
   * This is the first action to be rendered when the component is mounted.
  ****************************************************************/
  getRecipeSummaryList = async() => {

    console.log('Attempt to send request to get recipe summary list');
    const URL = SERVER_IP_ADDRESS + '/recipes/' + this.state.username;
    console.log('Request URL', URL);
    this.setState({isLoading: true});

    try {
      const response = await axios.get(URL);
      //console.log(response.data);

      this.setState({isLoading: false});

      if (response.data.status === 200) {
        this.setState({
          recipeSummaryList: response.data.response,
          totalRecipesUploaded: response.data.response.length
        });
      } else {
        console.log('Failed to get user status', response.data);
      }
    } catch (error) {
      console.log('Error getting recipe summary list', error);
    }
  } 

  /***************************************************************
   * Handle the action when edit recipe is clicked
  ****************************************************************/
  handleEditRecipeName = async() => {

    this.setState({isLoading: true});

    console.log('Attempt to edit recipe name');
    
    const URL = SERVER_IP_ADDRESS + '/recipes/' + this.state.newRecipeName + '/' + this.state.targetedRecipeId;
    console.log('Request URL to edit recipe name', URL);

    try {
      const response = await axios.put(URL);
      this.setState({isLoading: false});

      if (response.data.status === 200) {
        console.log('Successfully updated!');
        this.getRecipeSummaryList();

      } else {
        console.log('Error', response.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  /***************************************************************
   * Handle the action when delete recipe is clicked
  ****************************************************************/
  handleDeleteRecipe = async() => {

    console.log('Attempt to delete a recipe');
    this.setState({isLoading: true});

    const URL = SERVER_IP_ADDRESS + '/recipes/' + this.state.targetedRecipeId;
    console.log('Deletion Request URL', URL);

    try {
      const response = await axios.delete(URL);

      this.setState({isLoading: false});

      if (response.data.status === 200) {
        console.log('Successfully deleted!');
        this.getRecipeSummaryList();    
      } else {
        console.log('Error deleting recipe', response.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  /***************************************************************
   * Handle the action when view full recipe is clicked
  ****************************************************************/
  handleViewFullRecipe = async(recipeId) => {

    console.log('Attempt to send request to view full recipe');
    const URL = SERVER_IP_ADDRESS + '/recipes/details/' + recipeId;
    console.log('Request URL to view detailed recipe', URL);
    this.setState({isLoading: true});

    try {

      const response = await axios.get(URL);
      const results = response.data;

      if (results.status === 200) {

        this.setState({
          recipeDetails: {
            countryName: results.countryName,
            timeNeeded: results.timeNeeded,
            difficultyLevel: results.difficultyLevel,
            dietType: results.dietType,
            foodType: results.foodType,
            ingredients: results.ingredients,
            cookingSteps: results.cookingSteps
          },
          isLoading: false,
          showViewFullRecipeModal: true
        });

        console.log('Details: ', this.state.recipeDetails);
      } else {
        console.log('Failed to retrieve detailed recipe with id', recipeId, results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /***************************************************************
   * Render the overlay screen when edit recipe is clicked
  ****************************************************************/
  renderEditRecipeName() {
    
    return (

      <View>
        <Overlay 
          isVisible={this.state.showViewEditRecipeModal}
          overlayStyle={{
            width: Dimensions.get('window').width - 50,
            height: 250,
            borderRadius: 20
          }}
          onBackdropPress={() => {
            this.setState({showViewEditRecipeModal: true});
          }}
        >
          <Text style={{color: '#05b6ff', fontSize: 16, padding: 15, textAlign: 'center', fontWeight: 'bold'}}>Give A New Name To Your Secret Recipe</Text>
          <View style={{justifyContent: 'center', alignSelf: 'center'}}>
            <TextField
              style={{marginTop: 50}}
              placeholder={'Enter the new recipe name'}
              onChangeText = {(newRecipeName) => this.setState({newRecipeName})}
            />          
          </View>

          <Button
            containerStyle={{padding: 5, width: 300, alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 10}}
            titleStyle={{fontSize: 17, fontWeight: 'bold', color: 'white'}}
            buttonStyle={{borderRadius: 20, marginRight: 0, marginBottom: 0}}
            title="Save" 
            onPress={() => {
              this.setState({ showViewEditRecipeModal: false });
              this.handleEditRecipeName();
            }}                
          />

        </Overlay>
      </View>
    );
  }

  /***************************************************************
   * Render the overlay screen when delete recipe is clicked
  ****************************************************************/
  renderDeleteRecipe() {

    return (
      <View>
        <Overlay 
          isVisible={this.state.showDeleteRecipeModal}
          overlayStyle={{
            width: Dimensions.get('window').width - 50,
            height: 250,
            borderRadius: 20
          }}
          onBackdropPress={() => {
            this.setState({showDeleteRecipeModal: true});
          }}
        >
          <Text style={{fontSize: 16, padding: 15, textAlign: 'center', fontWeight: 'bold'}}>Are you sure you want to delete your masterpiece?</Text>
          <View style={{justifyContent: 'center', alignSelf: 'center'}}>
            <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={require('./../assets/images/sadface.png')} />
          </View>

          <Button
            containerStyle={{padding: 5, width: 300, alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 10}}
            titleStyle={{fontSize: 17, fontWeight: 'bold', color: 'white'}}
            buttonStyle={{backgroundColor: 'red', borderRadius: 20, marginRight: 0, marginBottom: 0}}
            title="Delete" 
            onPress={() => {
              this.handleDeleteRecipe();
              this.setState({ showDeleteRecipeModal: false });
            }}                
          />

        </Overlay>
      </View>
    );
  }

  /***************************************************************
   * Render the overlay screen when View Full Recipe is clicked
  ****************************************************************/
  renderViewFullRecipe() {

    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{textAlign: 'center', marginTop: 20}}>Hang on!!!</Text>
          <Text style={{textAlign: 'center'}}>Loading...</Text>
        </View>
      );
    }

    return (
      <Overlay 
        isVisible={this.state.showViewFullRecipeModal}
        overlayStyle={{
          width: Dimensions.get('window').width - 50,
          height: Dimensions.get('window').height - 350
        }}
        onBackdropPress={() => {this.setState({showViewFullRecipeModal: true});}}
      >
        <View>
          <View style={{padding: 10, marginBottom: 20}}>
            <ScrollView style={{paddingBottom: 10}} contentContainerStyle={{height: LIST_VIEW_HEIGHT * 2}}>

              <ListItem
                title={'Recipe Origin'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.countryName}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />

              <ListItem
                title={'Time Needed'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.timeNeeded}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />

              <ListItem
                title={'Ease of Preparation'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.difficultyLevel}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />
            
              <ListItem
                title={'Meal Type'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.foodType.map((a) => `${a.name},`).join(' ').slice(0, -1)}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />

              <ListItem
                title={'Diet Type'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.dietType.map((a) => `${a.name},`).join(' ').slice(0, -1)}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />
            
              <ListItem
                title={'Ingredient List'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.ingredients.map((a, index) => `${index + 1}.  ${a.name}\n`).join('')}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />

              <ListItem
                title={'Cooking Direction'}
                titleStyle={styles.questionTitleText}
                subtitle={this.state.recipeDetails.cookingSteps.map((a, index) => `Step ${index + 1}\n${a.step}\n\n`).join('')}
                leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/foodicon.png')} />}
                bottomDivider
              />

            </ScrollView></View>

          <Button
            containerStyle={{padding: 5, width: 300, alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 10}}
            titleStyle={{fontSize: 17, fontWeight: 'bold'}}
            buttonStyle={{borderRadius: 20, marginRight: 0, marginBottom: 0}}
            title="Close" 
            onPress={() => this.setState({showViewFullRecipeModal: false})}                
          />

        </View>
        
      </Overlay>
    );
  }

  /***************************************************************
   * Render Top View: Screen title, Total posted recipe
  ****************************************************************/
  renderTitleView() {
    return (
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <Text style={{...styles.titleStyle, paddingTop: 20}}>You have posted</Text>
        <Text style={{...styles.titleStyle}}>{this.state.totalRecipesUploaded} recipe{this.state.totalRecipesUploaded > 1 ? 's' : ''}!
        </Text>
      </View>
    );
  }

  /***************************************************************
   * Render the card list of all recipes in summary (no detail)
  ****************************************************************/
  renderRecipeList() {

    return (
      <View>
        {
          this.state.recipeSummaryList.map((data, index) => (
            <Card
              title={data.name}
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
                onPress={() => this.handleViewFullRecipe(data.id)}
              />
              
              <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 100}}>
                <Button
                  icon={<Icon name="md-create" color="#fff" size={20} />}
                  containerStyle={{padding: 5, width: 172}}
                  titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                  buttonStyle={{backgroundColor: 'green', borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title="  Edit Name" 
                  onPress={() => {
                    this.setState({showViewEditRecipeModal: true});
                    this.setState({targetedRecipeId: data.id});
                  }}
                />

                <Button
                  icon={<Icon name="ios-trash" color="#fff" size={20} />}
                  containerStyle={{padding: 5, width: 172}}
                  titleStyle={{fontSize: 17, fontWeight: 'bold'}}
                  buttonStyle={{backgroundColor: 'red', borderRadius: 20, marginRight: 0, marginBottom: 0}}
                  title="  Delete" 
                  onPress={() => {
                    this.setState({showDeleteRecipeModal: true});
                    this.setState({targetedRecipeId: data.id});
                  }}
                />
              </View>

              <Text style={{textAlign: 'right', padding: 5, marginTop: 5}}>Date Posted: {moment(data.latestUpdate).format('MMMM D, YYYY, HH:mm A')}</Text>
            </Card>
            
          ))
        }
      </View>
    );
  }
  
  render() {

    if (this.state.isLoading) {
      //Loading View while data is loading
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

        <View style={styles.topViewContainer} >
          {this.renderTitleView()}
        </View>

        <View style={styles.listViewContainer}>
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{height: LIST_VIEW_HEIGHT * 10}}>
            {this.renderRecipeList()}
          </ScrollView>
        </View>

        {this.renderViewFullRecipe()}
        {this.renderDeleteRecipe()}

        {this.renderEditRecipeName()}
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
  },
  scrollViewContainer: {
    alignSelf: 'center',
    marginTop: '15%',
    marginBottom: '15%',
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
  },
  questionTitleText: {
    fontWeight: 'bold',
    color: '#2980b9',
    textAlign: 'left'
  },
  subtitleDetailStyle: {
    color: 'black',
    fontSize: 15
  }

});
