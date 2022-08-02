import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import AppLayout from '../../containers/layout/AppLayout';
import useHttp from '../../hooks/use-http';
import './Result.scss';

const Result = () => {
  const formData = useSelector(state => state.form);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const requestBody = useMemo(
    () => ({ spec: formData.spec, products: formData.products }),
    [formData]
  );
  const requestConfig = useMemo(
    () => ({
      APIEndpoint: 'http://localhost:5080/api/calculate',
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    }),
    [requestBody]
  );
  const transformResponse = useCallback(data => {
    setResult(data);
  }, []);

  const { isLoading, httpError, sendHttpRequest } = useHttp(transformResponse);

  useEffect(() => {
    sendHttpRequest(requestConfig);
  }, [sendHttpRequest, requestConfig]);

  useEffect(() => {
    if (httpError.statusCode === 403) navigate('/login');
  }, [httpError, navigate]);

  return (
    <AppLayout>
      <>
        {isLoading && <h1 style={{ textAlign: 'center', color: 'white' }}>Loading...</h1>}
        {httpError && (
          <h2 style={{ textAlign: 'center', color: '#ee5e37' }}>{httpError.message}</h2>
        )}
        {result && (
          <Card style={{ marginBottom: '26rem' }}>
            <div className="result">
              <div className="result__top">
                <div className="result__total-cost">
                  <h3 className="result__heading">Total Cost</h3>
                  <strong className="result__cost">${result.data.totalCost}</strong>
                </div>
                <div className="result__project-details">
                  <h3 className="result__heading">Project Details</h3>
                  <span className="result__details">{formData.spec.toLowerCase()}</span>
                  <strong className="result__project-name">{formData.projectName}</strong>
                  <span className="result__details">
                    {formData.location}, {formData.city}
                  </span>
                </div>
              </div>
              <div className="result__bottom">
                <h3 className="result__heading">Products</h3>
                <ul className="result__product-list">
                  {formData.products.map((product, index) => (
                    /* eslint react/no-array-index-key:0 */
                    <li className="result__product" key={product.name + index}>
                      <span className="result__type">{product.type}</span>
                      <span className="result__name">{product.name}</span>
                      <span className="result__count">{product.count}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  buttonStyle="PRIMARY"
                  label="Modify Products"
                  onClick={() => navigate('/?modify=true')}
                />
              </div>
            </div>
          </Card>
        )}
      </>
    </AppLayout>
  );
};

export default Result;
