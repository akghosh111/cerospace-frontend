import React, { useState, useEffect } from 'react';
import { VoiceProvider } from '@humeai/voice-react';
import AITherapist from './AITherapist';

const fetchAccessToken = async () => {
    try {
      const response = await fetch('/auth/token', {
        method: 'POST',
      });
  
      const data = await response.json();
      return data?.access_token || '';
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

const EVI = () => {
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const apiKey = import.meta.env.VITE_HUME_API_KEY || '';
      const secretKey = import.meta.env.VITE_HUME_SECRET_KEY || '';

      if (!apiKey || !secretKey) {
        setError('Missing API key or secret key in environment variables');
        return;
      }

      const token = (await fetchAccessToken({ apiKey, secretKey })) || '';
      setAccessToken(token);
    };

    fetchToken();
  }, []);

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>;
  }

  if (!accessToken) {
    return <div className="p-4 text-gray-700">Loading...</div>;
  }

  return (
    <VoiceProvider
      auth={{ type: 'accessToken', value: accessToken }}
      configId={import.meta.env.VITE_HUME_CONFIG_ID}
    >
      <AITherapist />
    </VoiceProvider>
  );
};

export default EVI;