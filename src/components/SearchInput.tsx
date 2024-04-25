import React from 'react';
import TextInput from './TextInput.tsx';

const SearchInput = () => {
  const [query, setQuery] = React.useState('');

  return (
    <TextInput
      onChangeText={setQuery}
      value={query}
      placeholder="Search books"
      keyboardType="web-search"
    />
  );
};

export default SearchInput;
