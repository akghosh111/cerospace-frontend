import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Journals from './components/Journals';
import BreathingExercise from './components/BreathingExercise';
import MoodLogger from './components/MoodLogger';
import { supabase } from './supabaseClient';
import Resources from './components/Resources';
import CBTChatbot from './components/CBTChatbot';
import AITherapist from './components/AITherapist';
import EVI from './components/EVI';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    return session ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Navbar />
        
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard session={session} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/breathing-exercises"
            element={
              <ProtectedRoute>
                <BreathingExercise />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood-log"
            element={
              <ProtectedRoute>
                <MoodLogger supabase={supabase} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cbt-chatbot"
            element={
              <ProtectedRoute>
                <CBTChatbot/>
              </ProtectedRoute>
            }
          />
          {/* <Route path="/ai-therapist" element={<AITherapist />} /> */}

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;