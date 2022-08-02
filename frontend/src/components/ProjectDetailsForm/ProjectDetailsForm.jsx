import React, { useReducer, useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import DropDown from '../DropDown/DropDown';
import Input from '../Input/Input';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './ProjectDetailsForm.scss';

const ProjectDetailsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseData = useSelector(state => state.response);
  const formData = useSelector(state => state.form);
  const location = useLocation();
  const [disableForm, setDisableForm] = useState(false);

  /* eslint react-hooks/exhaustive-deps:0 */
  useEffect(() => {
    // console.log(new URLSearchParams(location.search).get('modify'));
    if (new URLSearchParams(location.search).get('modify') === 'true') setDisableForm(true);
  }, []);

  const httpRequestConfig = useMemo(
    () => ({
      APIEndpoint: 'http://localhost:5080/api/data'
    }),
    []
  );

  const [detailsDropDowns, dispatchDetailsDropDowns] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE':
          return {
            ...state,
            [action.dropDownType]: {
              ...state[action.dropDownType],
              isOpen: !state[action.dropDownType].isOpen
            }
          };
        case 'OPTIONS':
          return {
            ...state,
            [action.dropDownType]: { ...state[action.dropDownType], options: action.payload }
          };
        default:
          return state;
      }
    },
    {
      jobSpec: {
        isOpen: false,
        options: []
      }
    }
  );

  const dropDownToggleHandler = dropDownType => {
    dispatchDetailsDropDowns({ type: 'TOGGLE', dropDownType });
  };

  const transformResponseData = useCallback(
    data => {
      dispatch({ type: 'RESPONSE', payload: data });

      dispatchDetailsDropDowns({
        type: 'OPTIONS',
        dropDownType: 'jobSpec',
        payload: data.jobSpecs.map(obj => obj.name)
      });
    },
    [dispatch]
  );

  const { isLoading, httpError, sendHttpRequest } = useHttp(transformResponseData);

  useEffect(() => {
    sendHttpRequest(httpRequestConfig);
  }, [sendHttpRequest, httpRequestConfig]);

  useEffect(() => {
    if (httpError.statusCode === 403) navigate('/login');
  }, [httpError, navigate]);

  const formSubmitHandler = values => {
    if (values.jobSpec && values.projectLocation && values.projectName && values.city) {
      dispatch({
        type: 'DETAILS',
        payload: {
          spec: values.jobSpec,
          projectName: values.projectName,
          location: values.projectLocation,
          city: values.city
        }
      });

      dispatch({ type: 'PRODUCTS', payload: [] });
    }
  };

  const disableAddProducts = values => {
    if (values && values.jobSpec && values.projectName && values.projectLocation && values.city)
      return false;
    return true;
  };

  const resetHandler = () => {
    setDisableForm(false);
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <div className="project-details-form">
      {isLoading && <h1 style={{ textAlign: 'center', color: 'white' }}>Loading...</h1>}
      {httpError && <h2 style={{ textAlign: 'center', color: '#ee5e37' }}>{httpError.message}</h2>}
      {responseData && (
        <Card style={{ marginBottom: '26rem' }}>
          <h2 className="project-details-form__heading">Project Details</h2>

          {/* eslint react/jsx-no-bind:0 */}
          <Form onSubmit={formSubmitHandler}>
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className="project-details-form__form">
                <div className="project-details-form__form-row">
                  <Field name="jobSpec" initialValue={formData.spec}>
                    {({ input }) => (
                      <DropDown
                        title="Job Spec"
                        options={detailsDropDowns.jobSpec.options}
                        placeholder="Select your job spec"
                        isOpen={detailsDropDowns.jobSpec.isOpen}
                        onToggle={dropDownToggleHandler.bind(null, 'jobSpec')}
                        value={input.value}
                        onChange={option => input.onChange(option)}
                        initialValue={input.initialValue}
                        disabled={disableForm}
                      />
                    )}
                  </Field>

                  <Field name="projectName" initialValue={formData.projectName}>
                    {({ input }) => (
                      <Input
                        label="Project Name"
                        type="text"
                        placeholder="Give your project a name"
                        value={input.value}
                        onChange={value => input.onChange(value)}
                        initialValue={input.projectName}
                        disabled={disableForm}
                      />
                    )}
                  </Field>
                </div>
                <div className="project-details-form__form-row">
                  <Field name="projectLocation" initialValue={formData.location}>
                    {({ input }) => (
                      <Input
                        label="Project Location"
                        type="text"
                        placeholder="Select your location"
                        value={input.value}
                        onChange={value => input.onChange(value)}
                        initialValue={input.location}
                        disabled={disableForm}
                      />
                    )}
                  </Field>

                  <Field name="city" initialValue={formData.city}>
                    {({ input }) => (
                      <Input
                        label="City"
                        type="text"
                        placeholder="Select your city"
                        value={input.value}
                        onChange={value => input.onChange(value)}
                        initialValue={input.city}
                        disabled={disableForm}
                      />
                    )}
                  </Field>
                </div>
                <div className="project-details-form__form-row project-details-form__form-row--intrinsic-width">
                  {!disableForm && (
                    <Button
                      label="Add Products"
                      type="submit"
                      buttonStyle="PRIMARY"
                      disabled={disableAddProducts(values)}
                    />
                  )}
                  {disableForm && (
                    <Button
                      label="Reset"
                      type="button"
                      buttonStyle="PRIMARY"
                      onClick={resetHandler}
                    />
                  )}
                </div>
              </form>
            )}
          </Form>
        </Card>
      )}
    </div>
  );
};

export default ProjectDetailsForm;
