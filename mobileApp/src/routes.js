import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Image} from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import Logo from './assets/instagram.png';

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New,
    },
    {
      initialRouteName: 'Feed',
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitle: (
          <Image
            style={{
              height: 35,
              width: 120,
            }}
            source={Logo}
          />
        ),
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);
