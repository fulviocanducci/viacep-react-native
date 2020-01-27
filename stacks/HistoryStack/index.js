import { createStackNavigator } from 'react-navigation-stack';
import History from '../../screens/History/index';
import Viewer from '../../screens/History/viewer';

const HistoryStack = createStackNavigator(
  {
    Histórico: History,
    Visualizar: Viewer
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Histórico',
      title: 'Histórico'
    }
  }
);

export default HistoryStack;
