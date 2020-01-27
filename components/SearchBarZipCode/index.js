import React from 'react';
import { SearchBar } from 'react-native-elements';

function SearchBarZipCode({ onChangeText, onClear, value, onKeyPress }) {
  return (
    <SearchBar
      onChangeText={onChangeText}
      onClear={onClear}
      placeholder="Código postal..."
      lightTheme={true}
      showLoadingIcon={true}
      round={false}
      value={value}
      maxLength={8}
      keyboardType={'numeric'}
      onKeyPress={onKeyPress}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

export default SearchBarZipCode;
