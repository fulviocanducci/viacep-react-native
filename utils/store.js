import configurations from './configurations';
import { AsyncStorage } from 'react-native';

const store = {
  init: async () => {
    AsyncStorage.getItem(configurations.nameStorage, error => {
      if (error) {
        AsyncStorage.setItem(
          configurations.nameStorage,
          JSON.stringify([]),
          error => {
            if (!error) console.log('Initialize Storage ...');
          }
        );
      }
    });
  },
  get: async () => {
    const datas = await AsyncStorage.getItem(configurations.nameStorage);
    return datas === null ? [] : JSON.parse(datas);
  },
  add: async item => {
    const datas = await AsyncStorage.getItem(configurations.nameStorage);
    let items = datas === null ? [] : JSON.parse(datas);
    if (items.filter(x => x.cep === item.cep).length === 0) {
      items = [...items, item];
    }
    await AsyncStorage.setItem(
      configurations.nameStorage,
      JSON.stringify(items),
      error => {
        if (error) console.log(error);
      }
    );
  },
  remove: async () => {
    await AsyncStorage.removeItem(configurations.nameStorage, error => {
      if (error) console.log(error);
    });
  },
  find: async value => {
    const datas = await AsyncStorage.getItem(configurations.nameStorage);
    let items = datas === null ? [] : JSON.parse(datas);
    items = items.filter(x => x.cep === value);
    if (items) {
      const result = items[0];
      const data = [];
      let status = true;
      Object.keys(result).map(x => {
        if (result[x] && result[x] !== '') {
          if (x === 'erro') {
            status = false;
          }
          data.push({ item: x, value: result[x] });
        }
      });
      return {
        data,
        result,
        status
      };
    }
    return [];
  }
};

export default store;
