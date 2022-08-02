import React, { useEffect, useReducer, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../Input/Input';
import Card from '../Card/Card';
import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import './ProductsForm.scss';

const ProductsForm = ({ jobSpec }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const containerRef = useRef();

  const response = useSelector(state => state.response);
  const formData = useSelector(state => state.form);
  const [productRows, dispatchProductRows] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE':
          return {
            ...state,
            isOpen: state.isOpen.map((row, index) => {
              if (index === action.rowNumber) {
                return { ...row, [action.dropDownType]: !row[action.dropDownType] };
              }

              return row;
            })
          };
        case 'OPTIONS':
          return {
            ...state,
            [`${action.dropDownType}Options`]: action.payload
          };
        case 'ADD_ROW':
          return {
            ...state,
            isOpen: [...state.isOpen, { product: false }]
          };
        case 'SET_ROW':
          return { ...state, isOpen: [{ product: false }, { product: false }, { product: false }] };
        default:
          return state;
      }
    },
    {
      typeOptions: [],
      productOptions: [],
      isOpen:
        formData.products.length > 0
          ? new Array(formData.products.length).fill(0).map(_ => ({ product: false }))
          : [{ product: false }, { product: false }, { product: false }]
    }
  );

  /* eslint react-hooks/exhaustive-deps:0 */
  useEffect(() => {
    // if (new URLSearchParams(location.search).get('modify') === 'true')
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const productsDropDownOptions = response.jobSpecs.find(
      obj => obj.name === jobSpec
    ).validProducts;

    dispatchProductRows({
      type: 'OPTIONS',
      dropDownType: 'product',
      payload: productsDropDownOptions
    });
  }, [response, jobSpec]);

  const dropDownToggleHandler = (rowNumber, dropDownType) => {
    dispatchProductRows({ type: 'TOGGLE', rowNumber, dropDownType });
  };

  const disableProductsSubmitButton = values => {
    let disable = true;

    if (Object.keys(values).length === 0) return true;

    for (const row of values.productRow) {
      if (row && row.count && row.type && row.product) {
        disable = false;
        break;
      }
    }

    return disable;
  };

  const disableProductsAddButton = values => {
    let disable = false;

    if (Object.keys(values).length === 0) return true;

    for (const row of values.productRow) {
      if (row && (!row.count || !row.type || !row.product)) {
        disable = true;
        break;
      }
    }

    return disable;
  };

  const formSubmitHandler = values => {
    const products = values.productRow
      .filter(row => row.type && row.product && row.count)
      .map(row => ({ type: row.type, count: row.count, name: row.product }));

    dispatch({ type: 'PRODUCTS', payload: products });

    navigate('/result');
  };

  /* eslint react-hooks/exhaustive-deps:0 */
  useEffect(() => {
    if (formData.products.length === 0) {
      for (let i = 0; i < productRows.isOpen.length - 3; i += 1) inputRef.current.click();
    }
  }, [formData.products]);

  return (
    <div className="products-form" ref={containerRef}>
      <Card size="WIDE" style={{ marginTop: '-21.2rem', marginBottom: '22rem' }}>
        <h2 className="products-form__heading">Products</h2>

        <Form onSubmit={formSubmitHandler} mutators={{ ...arrayMutators }}>
          {({
            handleSubmit,
            values,
            form: {
              mutators: { push, pop }
            },
            ...formState
          }) => (
            <form onSubmit={handleSubmit}>
              {Object.keys(values).length === 0 &&
                productRows.isOpen.forEach(_ => push('productRow', undefined))}

              <FieldArray name="productRow">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <div className="products-form__products-form-row" key={name}>
                      <Field
                        name={`${name}.type`}
                        initialValue={formData.products[index] ? formData.products[index].type : ''}
                      >
                        {({ input }) => (
                          <Input
                            label="Type"
                            type="text"
                            placeholder="Type"
                            value={input.value}
                            onChange={value => input.onChange(value)}
                            initialValue={input.projectLocation}
                          />
                        )}
                      </Field>

                      <Field
                        name={`${name}.product`}
                        initialValue={formData.products[index] ? formData.products[index].name : ''}
                      >
                        {({ input }) => (
                          /* eslint react/jsx-no-bind:0 */
                          <DropDown
                            title="Product"
                            options={productRows.productOptions}
                            placeholder="Search or type your product name here"
                            isOpen={productRows.isOpen[index].product}
                            onToggle={dropDownToggleHandler.bind(null, index, 'product')}
                            value={input.value}
                            onChange={option => input.onChange(option)}
                            initialValue={input.initialValue}
                            id={index}
                          />
                        )}
                      </Field>

                      <Field
                        name={`${name}.count`}
                        initialValue={formData.products[index] ? formData.products[index].count : 0}
                      >
                        {({ input }) => (
                          <Counter
                            onChange={count => input.onChange(count)}
                            value={input.value}
                            initialValue={input.initialValue}
                          />
                        )}
                      </Field>
                    </div>
                  ))
                }
              </FieldArray>
              {/* ))} */}

              <div className="products-form__products-form-row products-form__products-form-row--btn">
                <Button
                  label="Add Products"
                  onClick={() => {
                    for (let i = 0; i < 3; i += 1) {
                      dispatchProductRows({ type: 'ADD_ROW' });
                      push('productRow', undefined);
                    }
                  }}
                  buttonStyle="PRIMARY"
                  type="button"
                  disabled={disableProductsAddButton(values)}
                />

                <Button
                  label="Calculate"
                  onClick={() => {}}
                  buttonStyle="SECONDARY"
                  type="submit"
                  disabled={disableProductsSubmitButton(values)}
                />
              </div>

              {/* eslint jsx-a11y/click-events-have-key-events:0 */
              /* eslint jsx-a11y/no-noninteractive-element-interactions:0 */}
              <input
                type="hidden"
                ref={inputRef}
                onClick={event => {
                  pop('productRow');
                }}
              />
            </form>
          )}
        </Form>
      </Card>
    </div>
  );
};

ProductsForm.propTypes = {
  jobSpec: PropTypes.string.isRequired
};

export default ProductsForm;
