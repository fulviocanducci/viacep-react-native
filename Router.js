import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { HomeStack, HistoryStack } from './stacks';

const TabNavigator = createBottomTabNavigator(
  {
    Busca: HomeStack,
    Histórico: HistoryStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        console.log(routeName);
        if (routeName === 'Busca') {
          //iconName = focused ? 'search' : 'adobe';
          iconName = 'search';
        } else if (routeName === 'Histórico') {
          //iconName = focused ? 'ios-list-box' : 'ios-list';
          iconName = 'history';
        }
        return <FontAwesome5 name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray'
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  console.log(routeName);
  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle
  };
};

const Router = createAppContainer(TabNavigator);

export default Router;
