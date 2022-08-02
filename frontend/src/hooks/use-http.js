import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState('');

  const sendRequest = useCallback(async (requestConfig, transform) => {
    setIsLoading(true);
    setHttpError('');
    const headers = { ...requestConfig.headers, 'Content-Type': 'application/json' };

    try {
      const response = await fetch(requestConfig.url, {
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Error: ${errorMessage}. Status Code: ${response.status}`);
      }

      const data = await response.json();

      transform(data);
    } catch (error) {
      setHttpError(error);
    }

    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    isLoading,
    httpError
  };
};

export default useHttp;
