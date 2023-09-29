import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '@app/Screens/Home';
import Add from '@app/Screens/Add';
import Edit from '@app/Screens/Edit';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Netflix watching list',
            headerShadowVisible: false,
            headerTintColor: '#00214d',
            headerStyle: {
              backgroundColor: '#fffffe',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            title: 'Add Season',
            headerShadowVisible: false,
            headerTintColor: '#00214d',
            headerStyle: {
              backgroundColor: '#fffffe',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: 'Edit Season',
            headerShadowVisible: false,
            headerTintColor: '#00214d',
            headerStyle: {
              backgroundColor: '#fffffe',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
