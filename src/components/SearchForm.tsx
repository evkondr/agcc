/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input';

type SearchFormProps = {
  // eslint-disable-next-line no-unused-vars
  searchHandler: (value:string) => void
}

const { Search } = Input;

const SearchForm = ({ searchHandler }: SearchFormProps) => {
  const onSearch:SearchProps['onSearch'] = (value) => {
    // TODO: Serch elements
    searchHandler(value);
  };
  return (
    <div className="search-form">
      <Search placeholder="поиск" onSearch={onSearch} style={{ width: 300 }} />
    </div>
  );
};
export default SearchForm;
