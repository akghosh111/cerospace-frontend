import React, { useState } from 'react';
import { useVoice } from '@humeai/voice-react';

const AITherapist = () => {
  const [conversation, setConversation] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { status, connect, disconnect } = useVoice();

  const therapistPrompt = `You are a kind, empathetic, and highly skilled therapist specializing in narrative and cognitive behavioral therapy (CBT). Help the user reframe negative thoughts, explore their personal stories, and find empowering perspectives. Always use empathy.`;

  const handleVoiceToggle = () => {
    if (status.value === 'connected') {
      disconnect();
      return;
    }

    connect()
      .then(() => setError(null))
      .catch((err) => {
        setError('Failed to connect. Please try again.');
        console.error('Voice connection error:', err);
      });
  };

  const handleSendMessage = async () => {
    if (!transcript.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage = { sender: 'user', message: transcript.trim() };
    setConversation((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: transcript.trim(),
          persona: therapistPrompt
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = {
        sender: 'therapist',
        message: data.output || 'I am here to listen and support.'
      };

      setConversation((prev) => [...prev, aiResponse]);
      setTranscript('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Message error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (status.value) {
      case 'error':
        return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Something went wrong</p>
            <button
              onClick={handleVoiceToggle}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Try again
            </button>
          </div>
        );

      case 'disconnected':
      case 'connecting':
        return <div className="text-gray-600">Initializing chat...</div>;

      case 'connected':
        return (
          <>
            <div className="h-64 overflow-y-auto bg-white p-4 border border-gray-300 rounded mb-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.sender === 'user' ? 'text-right text-blue-900' : 'text-green-700'}`}
                >
                  <p className="inline-block p-2 bg-gray-100 rounded-lg">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
              placeholder="Type your message here..."
              disabled={isLoading}
              rows={3}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
        <h1 className="text-blue-900 text-3xl font-bold mb-4">AI Therapist</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {renderContent()}

        <div className="flex gap-4">
          <button
            className={`py-2 px-4 rounded text-white transition-colors duration-200 disabled:opacity-50 ${
              status.value === 'connected'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={handleVoiceToggle}
            disabled={isLoading}
          >
            {status.value === 'connected' ? 'End chat' : 'Start chat!'}
          </button>
          {status.value === 'connected' && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
              onClick={handleSendMessage}
              disabled={isLoading || !transcript.trim()}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITherapist;
