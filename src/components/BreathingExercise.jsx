import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Get Ready'); // 'inhale', 'hold', 'exhale'
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => {
          if (timer >= 12) {
            setTimer(0);
            return 0;
          }
          return timer + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timer <= 4) {
      setPhase('Breathe In');
    } else if (timer <= 7) {
      setPhase('Hold');
    } else {
      setPhase('Breathe Out');
    }
  }, [timer]);

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimer(0);
      setPhase('Get Ready');
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setTimer(0);
    setPhase('Get Ready');
  };

  return (
    <div className="min-h-screen bg-blue-50 py-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Breathing Exercise</h1>
          
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className={`absolute inset-0 rounded-full border-4 border-blue-500 ${
              isActive ? 'animate-pulse' : ''
            }`}>
              <div className="flex items-center justify-center h-full">
                <span className="text-2xl font-semibold text-blue-600">{phase}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={toggleExercise}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetExercise}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <RefreshCw size={20} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;