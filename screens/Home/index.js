import React, { useState, useEffect } from 'react';
import { View, Keyboard, SafeAreaView, StyleSheet, Alert } from 'react-native';

import {
  FlatListZipCode,
  ButtonZipCode,
  SearchBarZipCode
} from '../../components';

import { store, service } from '../../utils';

function Home() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  async function loadZipCodeAsync() {
    if (validate()) {
      setResult([]);
      Keyboard.dismiss();
      const { data, result, status } = await service.get(value);
      setLoading(false);
      if (status) {
        setResult(data);
        store.add(result);
      } else {
        Alert.alert('Error', 'Código postal digitado inválido');
      }
    } else {
      Alert.alert('Error', 'Digite o Código postal correto');
      setLoading(false);
    }
  }

  function validate() {
    var er = /[0-9]/;
    return value && value.length === 8 && er.test(value);
  }

  function handlerClear() {
    setResult([]);
  }

  function handlerKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace' && value.length >= 0) {
      setResult([]);
    }
  }

  function handlerButton() {
    setLoading(true);
    loadZipCodeAsync();
  }

  useEffect(() => {
    store.init();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <SearchBarZipCode
          onChangeText={setValue}
          onClear={handlerClear}
          value={value}
          onKeyPress={handlerKeyPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonZipCode onPress={handlerButton} loading={loading} />
      </View>
      <SafeAreaView style={styles.safeAreViewContainer}>
        <FlatListZipCode result={result} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  buttonContainer: {
    margin: 10
  },
  safeAreViewContainer: {
    flex: 1
  }
});

export default Home;
