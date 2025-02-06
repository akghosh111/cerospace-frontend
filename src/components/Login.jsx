import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email.trim()) {
      setMessage('Please enter a valid email.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Check your email for the login link!');
      // Redirect to dashboard after a small delay for better UX
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 pt-24">
      <h1 className="text-xl font-bold">Welcome to Cerospace!</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded-md w-80"
      />
      <button 
        onClick={handleSignIn} 
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Send Magic Link
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
