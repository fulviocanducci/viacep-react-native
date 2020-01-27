import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  RefreshControl,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';

import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import ButtonHistory from '../../components/ButtonHistory';

import store from '../../utils/store';

function History({ navigation }) {
  const [datas, setDatas] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDataStorage();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  async function loadDataStorage() {
    const items = await store.get();
    if (items !== null) {
      setDatas(items);
    } else {
      setDatas([]);
    }
  }

  function onRedirect(value) {
    navigation.navigate('Visualizar', { value: value });
  }

  async function onDelete(value) {
    Alert.alert(
      'Remover',
      'Deseja excluir esse código postal?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            await store.removeItem(value);
            await loadDataStorage();
          }
        }
      ],
      { cancelable: false }
    );
  }
  if (datas !== null) {
    return (
      <SafeAreaView>
        <NavigationEvents onWillFocus={payload => loadDataStorage()} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {datas &&
            datas
              .sort((a, b) => a.cep > b.cep)
              .map((item, i) => (
                <ListItem
                  key={i}
                  title={item.cep}
                  subtitle={`${item.localidade}/${item.uf}`}
                  leftIcon={{ name: item.icon }}
                  bottomDivider
                  rightElement={
                    <ButtonHistory
                      onRedirect={() => onRedirect(item.cep)}
                      onDelete={() => onDelete(item.cep)}
                    />
                  }
                />
              ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NavigationEvents onWillFocus={payload => loadDataStorage()} />
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default History;
