/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions} from 'react-native';
import { ButtonGroup, Button, Divider, ListItem, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {FULL_RECIPE_DATA} from './../utilities/SampleTestData';


export default class SearchRecipes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      recipesList: FULL_RECIPE_DATA.data,

      difficultyLevel: 0,
      foodType: 0,
      dietType: 0,

      showViewFullRecipeModal: false
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

  handleSearchRecipe = async() => {
    console.log('Attempt to search for recipes');

    // http://localhost:8080/recipes/search
    // {
    //   "foodType": "Lunch",
    //   "dietType": "Organic",
    //   "difficultyLevel": "Easy"
    // }

    try {
      //{
      //     "status": 200,
      //     "response": [
      //         {
      //             "Count(detail.id)": 9,
      //             "Count(rep.id)": 9,
      //             "recipeName": "recipe_name_1",
      //             "recipeId": 1,
      //             "recipeDetailId": 1
      //         },
      //         {
      //             "Count(detail.id)": 9,
      //             "Count(rep.id)": 9,
      //             "recipeName": "recipe_name_2",
      //             "recipeId": 2,
      //             "recipeDetailId": 2
      //         },
      //         {
      //             "Count(detail.id)": 9,
      //             "Count(rep.id)": 9,
      //             "recipeName": "recipe_name_3",
      //             "recipeId": 3,
      //             "recipeDetailId": 3
      //         }
      //     ]
      // }

    } catch (error) {
      console.log('Error searching for recipes', error);
    }
  }


  renderRecipeList() {
    return (
      <View style={{justifyContent: 'center'}}>
        {
          this.state.recipesList.map((data, index) => (
            <ListItem
              key={index}
              title={data.recipeName}
              subtitle={data.origin}
              bottomDivider
              rightElement={
                <View style={{flexDirection: 'row'}}>
                  <Button
                    icon={<Icon name="md-open" color="#fff" size={20} />}
                    containerStyle={{padding: 5, width: 130, alignSelf: 'center'}}
                    titleStyle={{fontSize: 14, fontWeight: 'bold'}}
                    buttonStyle={{borderRadius: 5, marginRight: 0, marginBottom: 0}}
                    title="  View" 
                    onPress={() => this.setState({showViewFullRecipeModal: true})}                
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
          <ScrollView contentContainerStyle={{height: Dimensions.get('window').height * 2}}>
            <Text>data...</Text>           
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

  renderSearchForm() {
    return (
      <View style={{}}>
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
          titleStyle={{fontSize: 15, fontWeight: 'bold'}}
          containerStyle={{width: (Dimensions.get('window').width) - 10, alignSelf: 'center', marginTop: 20}}
          buttonStyle={{
            borderWidth: 3,
            borderColor: 'white',
            borderRadius:20
          }}
          onPress={this.handleSearchRecipe} 
        />


      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={{textAlign: 'right', paddingBottom: 30, fontFamily: 'AmericanTypewriter-Bold', fontSize: 20, fontWeight: 'bold', color: '#FFF', paddingTop: 50}}>Search for yummy stuffs...</Text>
          {this.renderSearchForm()}
        </View>

        <View style={styles.resultsContainer}>
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
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
});
