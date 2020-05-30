/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, Platform, View, SafeAreaView, Dimensions, Image} from 'react-native';
import {Colors, Card} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_IP_ADDRESS, USER_KEY_STORAGE} from '../serverConfig';
import axios from 'axios';

export default class HomepageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

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

  render() {

    return (
      <SafeAreaView style={styles.container}>

        {this.renderTitleView()}
        
        <View style={styles.buttonContainer}>
          {this.renderButtonOption('Post a New Recipe', require('./../assets/images/add.png'), 'PostNewRecipe')}
          <View style={{flex:0.1}}/>
          {this.renderButtonOption('View My Posted Recipes', require('./../assets/images/view.png'), 'ViewMyRecipes')}
          <View style={{flex:0.1}}/>
          {this.renderButtonOption('My Favorite Recipes', require('./../assets/images/favorite.png'), 'MyFavoriteScreen')}
        </View>

      </SafeAreaView>
    );
  }

  renderTitleView() {
    return (
      <View style={{height: TITLE_HEIGHT_VIEW}}>
        <View style={{backgroundColor: '#05b6ff', position: 'absolute', top: 0, left: 0, 
          width: Dimensions.get('window').width, height: 250}} />
        <Text style={{...styles.titleText, top: 90, left: 20, fontSize: Platform.OS === 'ios' ? 45 : 25, color: 'white'}}>Welcome, {this.state.username}!</Text>
      </View>
    );
  }

  renderButtonOption = (title, imageSource, navigatorRouteName) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Card
          row
          height={120}
          width={320}
          style={{marginBottom: 15}}
          onPress={() => {this.props.navigation.navigate(navigatorRouteName);}}
          enableBlur
          borderRadius={20}
          useNative
          backgroundColor={Colors.white}
          activeOpacity={1}
          activeScale={0.66}
        >
          <Card.Image width={100} style={{marginTop: 5, padding: 15, resizeMode: 'contain', height: 100}} imageSource={imageSource}/>
          <View flex>
            <Text style={styles.bottonOptionText}>
              {title}
            </Text>
          </View>
        </Card>
      </View>
    );
  }

}

const WHOLE_VIEW = Dimensions.get('window').height;
const TITLE_HEIGHT_VIEW = (WHOLE_VIEW / 2) - 150;
const OPTIONS_HEIGHT_VIEW = WHOLE_VIEW - TITLE_HEIGHT_VIEW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#121212',
    fontFamily: 'SavoyeLetPlain',
    fontWeight: 'bold',
    fontSize: 70,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    top: 100,
    zIndex: 4
  },
  buttonContainer: {
    alignSelf: 'center',
    height: OPTIONS_HEIGHT_VIEW
  },
  bottonOptionText: {
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 40,
    color: '#2980b9',
  }
});
