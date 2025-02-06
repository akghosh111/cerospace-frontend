import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';

const moodOptions = [
  { value: 5, label: 'Great', icon: ThumbsUp, color: 'text-green-700' },
  { value: 4, label: 'Good', icon: Smile, color: 'text-blue-600' },
  { value: 3, label: 'Okay', icon: Meh, color: 'text-yellow-600' },
  { value: 2, label: 'Not Great', icon: Frown, color: 'text-orange-600' },
  { value: 1, label: 'Terrible', icon: ThumbsDown, color: 'text-red-600' }
];

const factorOptions = [
  'Work', 'Family', 'Health', 'Relationships', 
  'Sleep', 'Exercise', 'Diet', 'Weather',
  'Social Activities', 'Personal Growth'
];

const MoodLogger = ({ supabase }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User:', user); // Check if user is available
      
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(7);
  
      console.log('Raw data from supabase:', data); // Check raw data
      console.log('Error:', error); // Check for errors
      
      if (error) throw error;
  
      const formattedData = data.length > 0 
        ? data.map(entry => ({
            date: new Date(entry.created_at).toLocaleDateString(),
            mood: entry.mood_value,
            moodValue: Number(entry.mood_value)
          })).reverse()
        : [];
  
      console.log('Formatted data:', formattedData); // Check formatted data
      setMoodHistory(formattedData);
    } catch (error) {
      console.error('Error fetching mood history:', error);
      setMoodHistory([]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
  
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('mood_logs')
        .insert([
          {
            user_id: user.id,
            mood_value: selectedMood,
            factors: selectedFactors,
            notes: notes,
            created_at: new Date().toISOString(),
          }
        ]);
  
      if (error) throw error;
  
      setSelectedMood(null);
      setSelectedFactors([]);
      setNotes('');
      await fetchMoodHistory();
    } catch (error) {
      console.error('Error logging mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFactor = (factor) => {
    setSelectedFactors(prev => 
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6 shadow-md pt-24">
        <div className="mb-6">
          <h2 className="text-blue-900 text-xl font-semibold mb-4">How are you feeling today?</h2>
        </div>
        <div>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {moodOptions.map(({ value, label, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setSelectedMood(value)}
                className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all
                  ${selectedMood === value ? 'bg-blue-200 scale-105' : 'bg-white hover:bg-blue-100'}`}
              >
                <Icon className={`w-8 h-8 ${color}`} />
                <span className="text-sm text-blue-900">{label}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-blue-900 mb-3">What's affecting your mood?</h3>
            <div className="flex flex-wrap gap-2">
              {factorOptions.map(factor => (
                <button
                  key={factor}
                  onClick={() => toggleFactor(factor)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors
                    ${selectedFactors.includes(factor)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-100'
                    }`}
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-blue-900 mb-3">Add a note about your day</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
              placeholder="How was your day? (optional)"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedMood || isLoading}
            className={`w-full py-2 px-4 rounded-lg text-white transition-colors
              ${!selectedMood || isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-900 hover:bg-blue-800'
              }`}
          >
            {isLoading ? 'Saving...' : 'Log My Mood'}
          </button>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6 shadow-md">
        <div className="mb-4">
          <h2 className="text-blue-900 text-xl font-semibold">Your Mood History</h2>
        </div>
        <div className="h-64 w-full">
          {moodHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  stroke="#1e3a8a"
                  fontSize={12}
                  tick={{ fill: '#1e3a8a' }}
                />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  stroke="#1e3a8a"
                  fontSize={12}
                  tick={{ fill: '#1e3a8a' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #1e3a8a',
                    borderRadius: '4px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="moodValue"
                  stroke="#1e3a8a"
                  strokeWidth={2}
                  dot={{ fill: '#1e3a8a', r: 4 }}
                  activeDot={{ r: 6, fill: '#1e3a8a' }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-blue-900">
              No mood data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodLogger;