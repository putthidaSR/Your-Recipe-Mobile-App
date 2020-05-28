import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { ButtonGroup, Button, CheckBox , ListItem } from 'react-native-elements';
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import RadioGroup from 'react-native-radio-button-group';

export default class PostNewRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipeName: '',
      dietType: '',
      foodType: '',
      origin: '',
      ingredientList: [],
      stepList: [],
      difficultyLevel: '',
      timeNeeded: ''
    };

    this.handlePostNewRecipe = this.handlePostNewRecipe.bind(this);
  }

  handlePostNewRecipe() {

  }

  renderFormContainer() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>PostNewRecipe</Text>
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
