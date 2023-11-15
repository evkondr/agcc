/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input';

const { Search } = Input;

const SearchForm = () => {
  const onSearch:SearchProps['onSearch'] = (value) => {
    // TODO: Serch elements
    console.log(value);
  };
  return (
    <div className="search-form">
      <Search placeholder="поиск" onSearch={onSearch} style={{ width: 300 }} />
    </div>
  );
};
export default SearchForm;
