import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

import store from '../../utils/store';

function History({ navigation }) {
  const [status, setStatus] = useState(false);
  const [datas, setDatas] = useState([]);
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
  useEffect(() => {
    setStatus(true);
  }, []);

  useEffect(() => {
    loadDataStorage();
  }, [status]);

  async function loadDataStorage() {
    const items = await store.get();
    if (items !== null) {
      setDatas(items);
    } else {
      setDatas([]);
    }
  }

  function handlerOnPressListView(value) {
    navigation.navigate('Visualizar', { value: value });
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {datas
          .sort((a, b) => a.cep > b.cep)
          .map((item, i) => (
            <ListItem
              key={i}
              title={item.cep}
              subtitle={`${item.localidade}/${item.uf}`}
              leftIcon={{ name: item.icon }}
              bottomDivider
              chevron
              onPress={() => handlerOnPressListView(item.cep)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default History;
