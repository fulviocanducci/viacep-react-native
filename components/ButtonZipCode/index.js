import React from 'react';
import { Button } from 'react-native-elements';

function ButtonZipCode({ onPress, loading }) {
  return (
    <Button
      onPress={onPress}
      raised
      icon={{ name: 'search', color: '#fff' }}
      title="Buscar"
      style={{ height: 100 }}
      loading={loading}
    />
  );
}

export default ButtonZipCode;
