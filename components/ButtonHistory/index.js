import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

function ButtonHistory({ onDelete, onRedirect }) {
  return (
    <View
      style={{
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}
    >
      <Button
        onPress={onDelete}
        buttonStyle={{
          backgroundColor: 'red',
          borderRadius: 5,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        icon={
          <Icon
            name="trash"
            style={{
              width: 25,
              height: 25,
              margin: 3,
              top: 5,
              left: 5,
              color: '#fff',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}
            size={15}
          />
        }
      />
      <Button
        onPress={onRedirect}
        buttonStyle={{
          borderRadius: 5,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        icon={
          <Icon
            name="eye"
            style={{
              width: 25,
              height: 25,
              margin: 3,
              top: 5,
              left: 5,
              color: '#fff',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}
            size={15}
          />
        }
      />
    </View>
  );
}

export default ButtonHistory;
