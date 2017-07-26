import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';

import Phone from '../dev-server/Phone';
import App from '../dev-server/containers/App';
import brandConfig from '../dev-server/brandConfig';
import version from '../dev-server/version';
import prefix from '../dev-server/prefix';

require('dotenv').config();

const apiConfig = process.env;

export const getPhone = () => {
  const phone = new Phone({
    apiConfig,
    brandConfig,
    prefix,
    appVersion: version,
  });
  const store = createMockStore({
    reducer: phone.reducer
  });
  phone.setStore(store);
  return phone;
};

export const getWrapper = () => {
  const phone = getPhone();
  return mount(<App phone={phone} />);
};

export const getState = wrapper => wrapper.props().phone.store.getState();

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
