/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { TfiFaceSad } from 'react-icons/tfi';

const PageNotFound = () => {
  return (
    <section className="page-404">
      <div className="page-404__block">
        <TfiFaceSad />
        <h5>Страница не найдена</h5>
        <Button>
          <Link to="/">Перейти на главную</Link>
        </Button>
      </div>
    </section>
  );
};

export default PageNotFound;
