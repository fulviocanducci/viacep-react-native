import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';
import { nameStorage } from '../../utils/configurations';

function History() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    loadDataStorage();
    console.log(new Date().toDateString());
  }, []);

  async function loadDataStorage() {
    const items = await AsyncStorage.getItem(nameStorage);
    if (items !== null) {
      setDatas(JSON.parse(items));
    } else {
      setDatas([]);
    }
  }

  async function handlerClearDataStorage() {
    await AsyncStorage.removeItem(nameStorage);
    await loadDataStorage();
    alert('oi');
  }

  return (
    <View>
      <Text>Oi: {datas.length}</Text>
      <Button onPress={handlerClearDataStorage} title="Excluir" />
    </View>
  );
}

export default History;
