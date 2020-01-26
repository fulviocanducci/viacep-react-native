import React, { useState, useEffect } from 'react';
import {
  View,
  Keyboard,
  FlatList,
  ScrollView,
  AsyncStorage,
  SafeAreaView
} from 'react-native';
import { SearchBar, Button, ListItem } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { nameStorage } from '../../utils/configurations';

function Home({ navigation }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  async function loadZipCodeAsync() {
    setResult([]);
    Keyboard.dismiss();
    const source = await fetch(`https://viacep.com.br/ws/${value}/json/`);
    const result = await source.json();
    const data = [];
    Object.keys(result).map(x => {
      if (result[x] && result[x] !== '') {
        data.push({ item: x, value: result[x] });
      }
    });
    setLoading(false);
    setResult(data);
    await saveAsyncStoreAdd(result);
  }

  function handlerClear() {
    setResult([]);
  }

  async function saveAsyncStoreAdd(item) {
    const datas = await AsyncStorage.getItem(nameStorage);
    let items = datas === null ? [] : JSON.parse(datas);
    if (items.filter(x => x.cep === item.cep).length === 0) {
      items = [...items, item];
    }
    await AsyncStorage.setItem(nameStorage, JSON.stringify(items), error => {
      if (error) console.log(error);
    });
  }

  useEffect(() => {
    AsyncStorage.getItem(nameStorage, error => {
      if (error) {
        AsyncStorage.setItem(nameStorage, JSON.stringify([]), error =>
          console.log('Initialize Storage ...')
        );
      }
    });
  }, []);

  function render({ item }) {
    return (
      <ListItem
        height={50}
        key={item.value}
        title={item.value}
        subtitle={item.item}
        leftIcon={<FontAwesome5 name="angle-double-right" />}
        marginBottom={9}
      />
    );
  }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View>
        <SearchBar
          onChangeText={e => setValue(e)}
          onClear={handlerClear}
          placeholder="Código postal ..."
          inputStyle={''}
          lightTheme={true}
          showLoadingIcon={true}
          round={true}
          value={value}
          maxLength={8}
          keyboardType={'numeric'}
          onKeyPress={e => {
            if (e.nativeEvent.key === 'Backspace' && value.length >= 0) {
              setResult([]);
            }
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          onPress={() => {
            setLoading(true);
            loadZipCodeAsync();
          }}
          raised
          icon={{ name: 'search', color: '#fff' }}
          title="Buscar"
          style={{ height: 100 }}
          loading={loading}
        />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ borderTopWidth: 1, borderColor: '#c1c1c1' }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          data={result}
          renderItem={render}
        />
      </SafeAreaView>
      <Button
        title="c"
        onPress={() =>
          navigation.navigate('Histórico', { d: new Date().getTime() })
        }
      ></Button>
    </View>
  );
}

export default Home;
