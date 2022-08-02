import { createStore } from 'redux';

const initialState = {
  formData: {},
  responseData: {}
};

/* eslint default-param-last:0 */
const responseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESULTS':
      return { ...state, responseData: action.payload };
    case 'FORM_DATA':
      return { ...state, formData: action.payload };
    default:
      return state;
  }
};

const store = createStore(responseReducer);

export default store;
