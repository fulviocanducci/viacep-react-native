import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { FlatListZipCode } from '../../components';
import store from '../../utils/store';

function Viewer({ navigation }) {
  const [value] = useState(navigation.getParam('value'));
  const [result, setResult] = useState([]);

  useEffect(() => {
    loadViewerZipCode();
  }, [value]);

  async function loadViewerZipCode() {
    const result = await store.find(value);
    if (result.status) {
      setResult(result.data);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreViewContainer}>
      <FlatListZipCode result={result} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreViewContainer: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Viewer;
