import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../screens/Home';

const HomeStack = createStackNavigator(
  {
    Busca: Home
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Busca Avançada',
      title: 'Busca Avançada'
    }
  }
);

export default HomeStack;
