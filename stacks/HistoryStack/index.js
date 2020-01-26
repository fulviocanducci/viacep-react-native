import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import History from '../../screens/History';

const HistoryStack = createStackNavigator(
  {
    Histórico: History
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Histórico de Busca',
      title: 'Histórico de Busca'
    }
  }
);

export default HistoryStack;
