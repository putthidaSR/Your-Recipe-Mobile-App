/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Dimensions, Alert, Image, Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';

import { ButtonGroup, Button, Divider } from 'react-native-elements';
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import {Colors, TextField, TagsInput} from 'react-native-ui-lib';
import SelectMultiple from 'react-native-select-multiple';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {USER_KEY_STORAGE} from '../serverConfig';

const foodTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
const dietTypeOptions = ['Gluten-Free', 'Organic', 'Keto', 'Paleo', 'Vegan', 'AIP Diet', 'Diary-Free'];

export default class PostNewRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {

      username: '',
      recipeName: '',
      timeNeeded: '',
      origin: '',

      dietType: [],
      dietValues: [],
      foodType: [],
     
      difficultyLevel: 0,

      ingredientList: [],
      stepList: [],

      foodTypeModal: false,
      dietTypeModal: false
    };

    this.handlePostNewRecipe = this.handlePostNewRecipe.bind(this);
  }

  /**
   * Get initial data when component is first mounted.
   */
  componentDidMount() {
    this.getUsername();
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

  async handlePostNewRecipe() {

    console.log('Attempt to send request to server to post a new recipe');

    const difficultyValue = this.state.difficultyLevel === 0 ? 'Easy'
      : this.state.difficultyLevel === 1 ? 'Medium' : 'Hard';

    const foodTypeValues = [];
    this.state.foodType.map((item) => {
      foodTypeValues.push(item.value);
    });

    const dietTypeValues = [];
    this.state.dietType.map((item) => {
      dietTypeValues.push(item.value);
    });

    const requestBody = {
      'username': 'user01',
      'recipeName': this.state.recipeName,
      'origin': this.state.origin,
      'timeNeeded': this.state.timeNeeded,
      'difficultyLevel': difficultyValue,
      'foodTypes': foodTypeValues,
      'dietTypes': dietTypeValues,
      'ingredientList': this.state.ingredientList,
      'cookingSteps': this.state.stepList
    };

    console.log(JSON.stringify(requestBody));

    Alert.alert(
      'Request to send to server',
      JSON.stringify(requestBody, null, '\n'),
      [{ text: 'OK'}],
      { cancelable: false },
    );

    try {

    } catch (error) {

    }

  }
  
  /***************************************************
   * View container for selecting food type options.
   ****************************************************/
  renderSelectFoodTypeOption() {

    return (
      <Modal.BottomModal
        visible={this.state.foodTypeModal}
        useNativeDriver={false}
        onTouchOutside={() => this.setState({ foodTypeModal: true })}
        height={0.4}
        width={1}
        onSwipeOut={() => this.setState({ foodTypeModal: false })}
        modalTitle={<ModalTitle title="Choose at least one of the options below" hasTitleBar
          textStyle={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}
          style={{padding: 20, backgroundColor: '#2980b9'}}
        />}
        footer={
          <ModalFooter style={{borderBottomColor: '#b5b5b5', backgroundColor: '#2980b9', borderBottomWidth: 0.5}}>
            <ModalButton text="Done" bordered
              onPress={() => {this.setState({ foodTypeModal: false });}}
              key="button-1"
              textStyle={{color: '#fff'}}
              style={{textAlign: 'center', borderBottomColor: '#b5b5b5', borderBottomWidth: 0.5}}
            />
          </ModalFooter>}
      >
        <ModalContent style={{flex: 1, backgroundColor: 'fff', justifyContent: 'center'}} >
          <SelectMultiple
            items={foodTypeOptions}
            labelStyle={{color: '#2980b9', fontWeight: 'bold'}}
            selectedItems={this.state.foodType}
            onSelectionsChange={(selectedType) => {
              this.setState({ foodType: selectedType });
            }} 
            checkboxSource={require('./../assets/images/uncheck.png')}
            selectedCheckboxSource={require('./../assets/images/add.png')}
          />
        </ModalContent>
      </Modal.BottomModal>
    );
  }

  /***************************************************
   * View container for selecting Diet type options.
   ****************************************************/
  renderSelectDietTypeOption() {

    return (
      <Modal.BottomModal
        visible={this.state.dietTypeModal}
        useNativeDriver={false}
        onTouchOutside={() => this.setState({ dietTypeModal: true })}
        height={0.6}
        width={1}
        onSwipeOut={() => this.setState({ dietTypeModal: false })}
        modalTitle={<ModalTitle title="Choose at least one of the options below" hasTitleBar
          textStyle={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}
          style={{padding: 20, backgroundColor: '#2980b9'}}
        />}        
        footer={
          <ModalFooter style={{borderBottomColor: '#b5b5b5', backgroundColor: '#2980b9', borderBottomWidth: 0.5}}>
            <ModalButton text="Done" bordered
              onPress={() => {this.setState({ dietTypeModal: false });}}
              key="button-1"
              textStyle={{color: '#fff'}}
              style={{textAlign: 'center', borderBottomColor: '#b5b5b5', borderBottomWidth: 0.5}}
            />
          </ModalFooter>}
      >
        <ModalContent style={{flex: 1, backgroundColor: 'fff', justifyContent: 'center'}} >
          <SelectMultiple
            items={dietTypeOptions}
            selectedItems={this.state.dietType}
            onSelectionsChange={(selectedType) => {
              this.setState({ dietType: selectedType });
            }} 
            labelStyle={{color: '#2980b9', fontWeight: 'bold'}}
            checkboxSource={require('./../assets/images/uncheck.png')}
            selectedCheckboxSource={require('./../assets/images/add.png')}
          />
        </ModalContent>
      </Modal.BottomModal>
    );
  }

  /***************************************************
   * Render button that will upload a recipe to server
  ****************************************************/
  renderBottomView() {
    return (
      <View style={{}}>
        <Button type="solid" title=" Upload Your Recipe! "
          titleStyle={{fontSize: 15, fontWeight: 'bold'}}
          containerStyle={{width: (Dimensions.get('window').width) - 50, alignSelf: 'center', marginTop: 20, marginBottom: -20}}
          buttonStyle={{
            borderWidth: 3,
            borderColor: 'white',
            borderRadius:20, 
            shadowOffset: {width: 5, height: 5},
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.43,
            elevation: 35
          }}
          icon={<Image style={{width: 35, height: 35}} source={require('./../assets/images/forkspoon.png')} />}
          onPress={this.handlePostNewRecipe} 
        />
      </View>
    );
  }

  /********************************************************
   * Render title view that displays at the top of the page
  *********************************************************/
  renderTitleView() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'AmericanTypewriter-Bold', fontSize: 25, fontWeight: 'bold', color: '#FFF', paddingTop: 40}}>What is your secret recipe?</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF', paddingTop: 10}}>Share us your yummy secret...</Text>
      </View>
    );
  }

  renderFormView() {


    return (
      <View style={{paddingTop: 10, width: FORM_CONTAINER_WIDTH - 50}}>  

        <TextField
          title={'Recipe Name'}
          titleStyle={styles.questionTitleText}
          style={{...styles.inputText, marginTop: -5, marginBottom: -10}}
          placeholder={'Enter your recipe name'}
          onChangeText = {(recipeName) => this.setState({recipeName})}
        />

        <View style={{marginTop: -15}}>
          <TextField
            style={{...styles.inputText, marginTop: -5, marginBottom: -10}}
            title={'Country of Origin'}
            titleStyle={styles.questionTitleText}
            placeholder={'Enter the origin of your recipe'}
            onChangeText = {(origin) => this.setState({origin})}
          />
        </View>
        
        <View style={{marginTop: -15}}>
          <TextField
            style={{...styles.inputText, marginTop: -5, marginBottom: -10}}
            title={'Time Needed'}
            titleStyle={styles.questionTitleText}
            placeholder={'Estimated prep and cooking time'}
            onChangeText = {(timeNeeded) => this.setState({timeNeeded})}
          />
        </View>
        
        <View style={{marginTop: -15}}>
          <Text style={{...styles.questionTitleText, marginBottom: 10}}>Food Type</Text>
          <TouchableOpacity onPress={() => {this.setState({foodTypeModal: true});}}>
            {this.renderSelectFoodTypeOption()}

            {this.state.foodType.length === 0 &&
              <Text style={{...styles.inputText, height: 25, color: 'gray'}}>
                Select food type options{'                                         '}
                <Icon name="md-arrow-dropdown" color="gray" size={20} />
              </Text>}

            {this.state.foodType.length > 0 && 
              <View style={{flexDirection: 'row'}}>
                {this.state.foodType.map((item) => {
                  return (<Text key={item.value}>{item.value},{'   '}</Text>);
                })}
              </View>}

          </TouchableOpacity>
          <Divider style={{ marginTop: 5, backgroundColor: 'gray' }} />
        </View>
        
        <View style={{marginTop: 20}}>
          <Text style={{...styles.questionTitleText, marginBottom: 10}}>Diet Type</Text>
          <TouchableOpacity onPress={() => {this.setState({dietTypeModal: true});}}>
            {this.renderSelectDietTypeOption()}
            
            {this.state.dietType.length === 0 &&
              <Text style={{...styles.inputText, height: 25, color: 'gray'}}>
                Select diet type options{'                                           '}
                <Icon name="md-arrow-dropdown" color="gray" size={20} />
              </Text>}

            {this.state.dietType.length > 0 && 
              <View style={{flexDirection: 'row'}}>
                {this.state.dietType.map((item) => {
                  return (<Text key={item.value}>{item.value},{'   '}</Text>);
                })}
              </View>}
          </TouchableOpacity>
          <Divider style={{ marginTop: 5, backgroundColor: 'gray' }} />
        </View>

        <View style={{ padding: 10 }} />

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

        <Text style={{...styles.questionTitleText, marginBottom: 10}}>Ingredients</Text>
        <TagsInput containerStyle={{marginBottom: 25}} 
          placeholder="Enter ingredient list" tags={this.state.ingredientList}
          onChangeTags={(newState) => {
            this.setState({
              ingredientList: newState
            });
          }} 
        />
        <Divider style={{ backgroundColor: 'gray' }} />

        <View style={{ padding: 5 }} />

        <Text style={{...styles.questionTitleText, marginBottom: 10}}>Cooking Direction</Text>
        <TagsInput containerStyle={{marginBottom: 25}} 
          placeholder="Enter cooking steps" tags={this.state.stepList}
          onChangeTags={(newState) => {
            this.setState({
              stepList: newState
            });
          }}  
        />
      </View>
    );

  }

  render() {

    return (
      <SafeAreaView style={styles.containerSafeArea}>
        <View style={{alignSelf: 'center', backgroundColor: '#05b6ff', position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width, height: 300}} />

        {/******** RENDER LOGO AND TITLE ON THE TOP OF THE SCREEN */}
        {this.renderTitleView()}

        {/******** RENDER FORM THAT IS SCROLLABLE */}

        <View style={styles.formContainer}>
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{flexGrow: 1, height: FORM_VIEW_HEIGHT * 2}}>
            {this.renderFormView()}
              
          </ScrollView>
        </View>

        {this.renderBottomView()}
      </SafeAreaView>
    );
  }
}

const WHOLE_HEIGHT_VIEW = Dimensions.get('window').height;
const FORM_VIEW_HEIGHT = 2 * WHOLE_HEIGHT_VIEW / 3;
const FORM_CONTAINER_WIDTH = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1
  },
  questionTitleText: {
    fontWeight: 'bold',
    color: '#2980b9',
    textAlign: 'left'
  },
  inputText: {
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 13
  },
  input: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'black',
    paddingHorizontal: 20,
    borderRadius: 20
  },
  formContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    width: FORM_CONTAINER_WIDTH,
    height: FORM_VIEW_HEIGHT + 200,
    flex: 0.93,
    borderRadius: 35,
    borderColor: '#fff', 
    borderWidth: 5,
    shadowOffset: {
      width: 5,
      height: 10
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.73,
    shadowRadius: 15,
    elevation: 35,
    marginTop: 50
  },
  scrollViewContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  customTag: {
    backgroundColor: Colors.purple30,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 10
  }
});
