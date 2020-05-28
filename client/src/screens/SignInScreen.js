import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import SignInForm from './../components/authentications/SignInForm';

export default class SignInScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.fullSize}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="never"
          scrollEnabled={false}>
          {/** Logo container */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('./../assets/images/add.png')}
            />
            <Text style={styles.titleText}>From Our Kitchen to Yours...</Text>
          </View>

          {/** Form container */}
          <View style={styles.formContainer}>
            <SignInForm 
              navigation={this.props.navigation}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scrollViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleText: {
    color: '#FFF',
    marginTop: 15,
    width: 200,
    textAlign: 'center',
    opacity: 0.7,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 50,
  },
});
