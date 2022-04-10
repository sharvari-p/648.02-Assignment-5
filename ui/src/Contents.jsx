/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductImg from './ProductImg.jsx';

const NotFound = () => <h1>Page Not Found</h1>;
export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route path="/img/:id" component={ProductImg} />
      <Route component={NotFound} />
    </Switch>
  );
}
