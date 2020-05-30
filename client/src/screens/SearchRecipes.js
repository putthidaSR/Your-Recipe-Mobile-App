/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions, Image, ActivityIndicator} from 'react-native';
import { ButtonGroup, Button, ListItem, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SERVER_IP_ADDRESS} from '../serverConfig';

import {FULL_RECIPE_DATA} from './../utilities/SampleTestData';


export default class SearchRecipes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {

      isLoading: false, // flag to indicate whether the screen is still loading
      isBeforeSearch: true, // flag to indicate whether this is the first time user is searching
      recipesList: FULL_RECIPE_DATA.data,
      fullRecipeData: {},
      recipeSummaryList: [],
      difficultyLevel: 0,
      foodType: 0,
      dietType: 0,
      recipeDetails: {
        countryName: '',
        timeNeeded: '',
        difficultyLevel: '',
        dietType: [],
        foodType: [],
        ingredients: [],
        cookingSteps: []
      },
      showViewFullRecipeModal: false
    };
    
  }

  /***************************************************************
   * Handle the action when search button is clicked
  ****************************************************************/
  handleSearchRecipe = async() => {

    this.setState({isLoading: true, isBeforeSearch: false});

    const requestUrl = SERVER_IP_ADDRESS + '/recipes/search';
    console.log('Attempt to send request to search for recipes', requestUrl);

    // Build request body
    const difficultyValue = this.state.difficultyLevel === 0 ? 'Easy'
      : this.state.difficultyLevel === 1 ? 'Medium' : 'Hard';

    const foodTypeValue = this.state.foodType === 0 ? 'Breakfast'
      : this.state.foodType === 1 ? 'Lunch'
        : this.state.foodType === 2 ? 'Dinner'
          : 'Dessert';

    const dietTypeValue = this.state.dietType === 0 ? 'Glueten-Free'
      : this.state.dietType === 1 ? 'Organic'
        : this.state.dietType === 2 ? 'Keto'
          : this.state.dietType === 3 ? 'Paleo'
            : this.state.dietType === 4 ? 'Vegan'
              : this.state.dietType === 5 ? 'API Diet'
                : 'Diary-Free';

    await axios.post(requestUrl, {
      foodType: foodTypeValue,
      dietType: dietTypeValue,
      difficultyLevel: difficultyValue
    })
      .then((response) => {
        console.log('response', response.data.response);
        
        if (response.data.status === 200) {
          this.setState({recipeSummaryList: response.data.response, isLoading: false});
        } else {
          console.log('Failed to get user status', response.data);
        }
        console.log('recipeSummar', this.state.recipeSummaryList);
      }, (error) => {
        console.log('Error searching for recipes', error);
      });
  }

  /***************************************************************
   * Handle the action when view full recipe is clicked
  ****************************************************************/
  handleViewFullRecipe = async(recipeId) => {

    this.setState({isLoading: true});

    console.log('Attempt to send request to view full recipe');
    const URL = SERVER_IP_ADDRESS + '/recipes/details/' + recipeId;
    console.log('Request URL to view detailed recipe', URL);

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
   * Render the overlay screen when View Full Recipe is clicked
  ****************************************************************/
  renderViewFullRecipe() {
    return (
      <Overlay 
        isVisible={this.state.showViewFullRecipeModal}
        overlayStyle={{
          width: Dimensions.get('window').width - 50,
          height: Dimensions.get('window').height - 350
        }}
        onBackdropPress={() => {this.setState({showViewFullRecipeModal: true});}}
      >
        <View style={{}}>

          <ScrollView contentContainerStyle={{height: Dimensions.get('window').height * 2}}>

            <ListItem
              title={'Recipe Origin'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.countryName}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />

            <ListItem
              title={'Time Needed'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.timeNeeded}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />

            <ListItem
              title={'Ease of Preparation'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.difficultyLevel}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />
          
            <ListItem
              title={'Meal Type'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.foodType.map((a) => `${a.name},`).join(' ').slice(0, -1)}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />

            <ListItem
              title={'Diet Type'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.dietType.map((a) => `${a.name},`).join(' ').slice(0, -1)}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />
          
            <ListItem
              title={'Ingredient List'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.ingredients.map((a, index) => `${index + 1}.  ${a.name}\n`).join('')}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />

            <ListItem
              title={'Cooking Direction'}
              titleStyle={styles.detailTitleStyle}
              subtitle={this.state.recipeDetails.cookingSteps.map((a, index) => `Step ${index + 1}\n${a.step}\n\n`).join('')}
              leftIcon={<Image style={{width: 60, height: 60}} source={require('./../assets/images/meal2.png')} />}
              bottomDivider
            />

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

  renderRecipeList() {

    if (this.state.isBeforeSearch) {
      return (
        <View style={{alignSelf: 'center', marginTop: 50}}>
          <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 10, color: 'gray', fontWeight: 'bold'}}>Start Your Searching Now{'\n'}For Yummy Stuffs...</Text>
        </View>
      );
    }

    if (!this.state.isBeforeSearch && this.state.recipeSummaryList.length === 0) {
      return (
        <View style={{alignSelf: 'center', marginTop: 50}}>
          <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 10, color: 'gray'}}>No Recipe Found :(</Text>
          <Text>Please search again with different filters!</Text>
        </View>
      );
    }

    return (
      <View style={{justifyContent: 'center'}}>
        {
          this.state.recipeSummaryList.map((data, index) => (
            <ListItem
              key={index}
              title={data.recipeName}
              bottomDivider
              leftAvatar={<Image style={{width: 35, height: 35}} source={require('./../assets/images/meal1.png')} />}
              rightElement={
                <View style={{flexDirection: 'row'}}>
                  <Button
                    icon={<Icon name="md-open" color="#fff" size={20} />}
                    containerStyle={{padding: 5, width: 130, alignSelf: 'center'}}
                    titleStyle={{fontSize: 13, fontWeight: 'bold'}}
                    buttonStyle={{borderRadius: 5, marginRight: 0, marginBottom: 0}}
                    title="  View Full" 
                    onPress={() => {
                      this.setState({showViewFullRecipeModal: true});
                      this.handleViewFullRecipe(data.recipeId);
                    }}                
                  />
                  {this.renderViewFullRecipe()}
                </View>
              }
            />
          ))
        }
      </View>
    );
  }

  renderSearchForm() {
    return (
      <View style={{marginTop: 100}}>
        <Text style={styles.questionTitleText}>Difficulty Level</Text>
        <ButtonGroup
          textStyle={{fontSize: 12}}
          onPress={(selectedIndex) => {
            this.setState({difficultyLevel: selectedIndex});
          }}
          selectedIndex={this.state.difficultyLevel}
          buttons={['Easy', 'Medium', 'Hard']}
          containerStyle={{height: 35, borderRadius: 10, borderWidth: 3}}
        />
        <View style={{ padding: 5 }} />

        <Text style={styles.questionTitleText}>Meal Type</Text>
        <ButtonGroup
          textStyle={{fontSize: 12}}
          onPress={(selectedIndex) => {
            this.setState({foodType: selectedIndex});
          }}
          selectedIndex={this.state.foodType}
          buttons={['Breakfast', 'Lunch', 'Dinner', 'Dessert']}
          containerStyle={{height: 35, borderRadius: 10, borderWidth: 3}}
        />
        <View style={{ padding: 5 }} />

        <Text style={styles.questionTitleText}>Diet Type</Text>
        <ButtonGroup
          textStyle={{fontSize: 12}}
          onPress={(selectedIndex) => {
            this.setState({dietType: selectedIndex});
          }}
          selectedIndex={this.state.dietType}
          buttons={['Gluten-Free', 'Organic', 'Keto', 'Paleo', 'Vegan', 'AIP Diet', 'Diary-Free']}
          containerStyle={{height: 35, borderRadius: 10, borderWidth: 3}}
        />

        <Button type="solid" title=" Search  "
          titleStyle={{fontSize: 15, fontWeight: 'bold', color:'#fff'}}
          containerStyle={{width: (Dimensions.get('window').width) - 100, alignSelf: 'center', marginTop: 20}}
          buttonStyle={{
            borderWidth: 3,
            borderColor: 'white',
            borderRadius:20
          }}
          raised={true}
          icon={<Image style={{width: 35, height: 35}} source={require('./../assets/images/riceBowlIcon.png')} />}
          onPress={this.handleSearchRecipe} 
        />


      </View>
    );
  }
  render() {

    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{textAlign: 'center', marginTop: 20}}>We're fetching your data...</Text>
          <Text style={{textAlign: 'center'}}>Hold on tight...</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          {this.renderSearchForm()}
        </View>

        <View style={styles.resultsContainer}>
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{width: Dimensions.get('window').width, height: Dimensions.get('window').height * 5}}>
            {this.renderRecipeList()}
          </ScrollView>
          
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollViewContainer: {
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 25
  },
  searchContainer: {
    alignSelf: 'center', 
    backgroundColor: '#05b6ff', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: Dimensions.get('window').width, 
    height: (Dimensions.get('window').height / 2) - 40,
    flex: 0.2
  },
  resultsContainer: {
    flex: 0.8,
    justifyContent: 'center',
    height: (Dimensions.get('window').height / 2) - 40,
    width: Dimensions.get('window').width,
    position:'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  questionTitleText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  inputText: {
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 13
  },
  detailTitleStyle: {
    fontWeight: 'bold',
    color: '#2980b9',
    textAlign: 'left'
  },
  subtitleDetailStyle: {
    color: 'black',
    fontSize: 15
  }
});
