import { createStore } from 'redux';

const initialState = {
  isLoggedIn: false,
  response: null,
  form: {
    spec: '',
    projectName: '',
    location: '',
    city: '',
    products: []
  }
};

/* eslint default-param-last:0 */
const formDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAILS':
      return { ...state, form: { ...state.form, ...action.payload } };
    case 'PRODUCTS':
      return { ...state, form: { ...state.form, products: action.payload } };
    case 'RESPONSE':
      return { ...state, response: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    case 'RESET_FORM':
      return {
        ...state,
        form: { spec: '', projectName: '', location: '', city: '', products: [] }
      };
    default:
      return state;
  }
};

const store = createStore(formDataReducer);

export default store;
