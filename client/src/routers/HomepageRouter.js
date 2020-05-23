import React, { Component } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import HomepageScreen from './../screens/HomepageScreen';

/**
 * This function component will render the HomePage of the main application after user is successfully logged in.
 */
export default function HomePageNavigator() {
  return (
    <HomepageBottomTab />
  );
}

/**
 * Bottom navigator tab for Homepage
 */
function HomepageBottomTab() {

  const MainBottomTab = createBottomTabNavigator();

  return (
    <MainBottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions= {{
        activeTintColor: '#2980b9',
        backgroundColor: 'blue',
        inactiveTintColor: 'rgba(0,0,0,0.3)',
        labelStyle:{fontWeight: 'bold'},
        labelPosition: 'below-icon',
        style:{padding: 5, paddingTop: 10, backgroundColor: 'white'}
      }}
    >
      <MainBottomTab.Screen 
        name="Home" 
        component={HomepageScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image
              style={{ width: 40, height: 40, resizeMode: 'contain'}}
              source={require('./../assets/images/homeicon1.png')}
            />          
          ),
        }}
      />

      <MainBottomTab.Screen 
        name="Account" 
        component={HomepageScreen}
        options={{
          tabBarLabel: 'Account'
        }}
      />

    </MainBottomTab.Navigator>
  );
}