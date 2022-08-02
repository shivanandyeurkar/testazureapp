import { useCallback, useState } from 'react';

const useHttp = transform => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState('');

  const sendHttpRequest = useCallback(
    async requestConfig => {
      setIsLoading(true);
      setHttpError('');
      const headers = { ...requestConfig.headers, Authorization: localStorage.getItem('tokenId') };
      let response;

      try {
        response = await fetch(requestConfig.APIEndpoint, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers,
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        });

        if (!response.ok) {
          const message = await response.json();
          throw new Error(`${message.message}. RESPONSE CODE: ${response.status}.`);
        }

        const data = await response.json();

        transform(data);
        setIsLoading(false);
      } catch (err) {
        setHttpError({ message: err.toString(), statusCode: response.status });
        setIsLoading(false);
      }
    },
    [transform]
  );

  return {
    isLoading,
    httpError,
    sendHttpRequest
  };
};

export default useHttp;
