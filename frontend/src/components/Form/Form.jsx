import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form as FinalForm, Field } from 'react-final-form';
import Button from '../Button/Button';
import DropDown from '../DropDown/DropDown';
import Input from '../Input/Input';
import ToggleButton from '../ToggleButton/ToggleButton';
import useHttp from '../../hooks/use-http';
import InlineInput from '../InlineInput/InlineInput';
import './Form.scss';

const Form = () => {
  const { sendRequest: getResults } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector(state => state.formData);

  const storeResponse = response => {
    dispatch({ type: 'RESULTS', payload: response });
    navigate('/results');
  };

  const submitHandler = async values => {
    dispatch({
      type: 'FORM_DATA',
      payload: {
        ...values,
        newHardwarePurchased:
          values.newHardwarePurchased === 'Not Applicable'
            ? 'Not Applicable'
            : +values.newHardwarePurchased.split(' ')[1]
      }
    });

    await getResults(
      {
        url: process.env.REACT_APP_API_ENDPOINT,
        method: 'POST',
        body: {
          ...values,
          newHardwarePurchased:
            values.newHardwarePurchased === 'Not Applicable'
              ? 'Not Applicable'
              : +values.newHardwarePurchased.split(' ')[1]
        }
      },
      storeResponse
    );
  };

  return (
    <div className="form">
      <FinalForm onSubmit={submitHandler}>
        {({ handleSubmit, submitting }) => (
          <form className="form__form" onSubmit={handleSubmit}>
            <div className="form__heading">Calculate Your Savings</div>
            <div className="form__controls">
              <Field name="firmName" initialValue={formData.firmName ? formData.firmName : ''}>
                {({ input }) => (
                  <Input
                    placeholder="Firm Name"
                    type="text"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field>

              {/* <Field
                name="needlesVersion"
                initialValue={formData.needlesVersion ? formData.needlesVersion : 'Needles 4'}
              >
                {({ input }) => (
                  <RadioGroup
                    options={['Needles 4', 'Needles 5']}
                    label="Version"
                    name="version"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field> */}

              <Field
                name="needlesVersion"
                initialValue={formData.needlesVersion ? formData.needlesVersion : 'Needles 5'}
              >
                {({ input }) => (
                  <DropDown
                    options={[
                      { value: 'Needles 4', label: 'Needles 4' },
                      { value: 'Needles 5', label: 'Needles 5' },
                      { value: 'Trialworks', label: 'Trialworks' }
                    ]}
                    label="Version"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                    openDirection="DOWN"
                  />
                )}
              </Field>

              {/* <Field name="userCount" initialValue={formData.userCount ? formData.userCount : -1}>
                {({ input }) => (
                  <Slider
                    label="Number of users"
                    max={400}
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field> */}

              <Field name="userCount" initialValue={formData.userCount ? formData.userCount : 10}>
                {({ input }) => (
                  <InlineInput
                    label="Number of users"
                    onChange={value => input.onChange(Number(value))}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field>

              {/* <Field
                name="onPremCostPerUser"
                initialValue={formData.onPremCostPerUser ? formData.onPremCostPerUser : 40}
              >
                {({ input }) => (
                  <Slider
                    label="On-Prem Cost Per User"
                    max={100}
                    prefix="$"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field> */}

              <Field
                name="onPremCostPerUser"
                initialValue={formData.onPremCostPerUser ? formData.onPremCostPerUser : 40}
              >
                {({ input }) => (
                  <InlineInput
                    label="On-Prem Cost Per User"
                    onChange={value => input.onChange(Number(value))}
                    initialValue={input.initialValue}
                    value={input.value}
                    prefix="$"
                  />
                )}
              </Field>

              {/* <Field
                name="cloudCostPerUser"
                initialValue={formData.cloudCostPerUser ? formData.cloudCostPerUser : 95}
              >
                {({ input }) => (
                  <Slider
                    label="Cloud Pricing Per User"
                    max={100}
                    prefix="$"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field> */}

              <Field
                name="cloudCostPerUser"
                initialValue={formData.cloudCostPerUser ? formData.cloudCostPerUser : 95}
              >
                {({ input }) => (
                  <InlineInput
                    label="Cloud Pricing Per User"
                    onChange={value => input.onChange(Number(value))}
                    initialValue={input.initialValue}
                    value={input.value}
                    prefix="$"
                  />
                )}
              </Field>

              {/* <Field
                name="dataBackup"
                initialValue={formData.dataBackup ? formData.dataBackup : false}
              >
                {({ input }) => (
                  <ToggleButton
                    label="Do you need Data Backup?"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field> */}

              <Field
                name="documentManagement"
                initialValue={formData.documentManagement ? formData.documentManagement : false}
              >
                {({ input }) => (
                  <ToggleButton
                    label="3rd Party Document Management"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                  />
                )}
              </Field>

              {/* eslint no-nested-ternary: 0 */}
              <Field
                name="newHardwarePurchased"
                initialValue={
                  formData.newHardwarePurchased
                    ? formData.newHardwarePurchased.toString().search(/\d/) === 0
                      ? `Year ${formData.newHardwarePurchased}`
                      : formData.newHardwarePurchased
                    : 'Year 3'
                }
              >
                {({ input }) => (
                  <DropDown
                    options={[
                      { value: 'Year 1', label: 'Year 1' },
                      { value: 'Year 2', label: 'Year 2' },
                      { value: 'Year 3', label: 'Year 3' },
                      { value: 'Year 4', label: 'Year 4' },
                      { value: 'Year 5', label: 'Year 5' },
                      { value: 'Not Applicable', label: 'Not Applicable' }
                    ]}
                    label="New Hardware Purchased"
                    onChange={value => input.onChange(value)}
                    initialValue={input.initialValue}
                    value={input.value}
                    openDirection="UP"
                  />
                )}
              </Field>
            </div>
            <div className="form__button-container">
              <Button
                type="submit"
                label="Calculate"
                buttonStyle="PRIMARY"
                freeSize
                disabled={submitting}
              />
            </div>
          </form>
        )}
      </FinalForm>
    </div>
  );
};

export default Form;
