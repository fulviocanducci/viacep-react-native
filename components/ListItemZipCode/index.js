import React from 'react';
import { ListItem } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ListItemZipCode({ data }) {
  return (
    <ListItem
      height={50}
      key={data.value}
      title={data.value}
      subtitle={data.item}
      leftIcon={<FontAwesome5 name="angle-double-right" />}
      marginBottom={9}
    />
  );
}

export default ListItemZipCode;
