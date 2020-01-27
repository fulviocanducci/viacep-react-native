import React from 'react';
import { FlatList, View } from 'react-native';

import ListItemZipCode from '../ListItemZipCode';
import ItemSeparatorListZipCode from '../ItemSeparatorListZipCode';

function FlatListZipCode({ result }) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <ItemSeparatorListZipCode />}
      keyExtractor={(item, index) => index.toString()}
      data={result}
      renderItem={data => <ListItemZipCode data={data.item} />}
    />
  );
}

export default FlatListZipCode;
