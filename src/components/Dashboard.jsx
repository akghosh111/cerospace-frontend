import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Dashboard = ({ session }) => {
  const navigate = useNavigate();

  const features = [
    { title: 'Mood Log', path: '/mood-log' },
    { title: 'Journal', path: '/journal' },
    { title: 'Breathing Exercises', path: '/breathing-exercises' },
    { title: 'Resources', path: '/resources' },
    { title: 'CBT Chatbot', path: '/cbt-chatbot' },
    { title: 'AI Therapist', path: 'https://cerospacetherapy.vercel.app/', external: true },
  ];

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-30 min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome, {session.user.email}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    feature.external ? (
      <a 
        key={index} 
        href={feature.path} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-6 bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer flex justify-between items-center transition-shadow"
      >
        <span className="text-lg font-semibold text-gray-800">{feature.title}</span>
        <ArrowRight size={24} className="text-blue-600" />
      </a>
    ) : (
      <div 
        key={index} 
        onClick={() => navigate(feature.path)} 
        className="p-6 bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer flex justify-between items-center transition-shadow"
      >
        <span className="text-lg font-semibold text-gray-800">{feature.title}</span>
        <ArrowRight size={24} className="text-blue-600" />
      </div>
    )
  ))}
</div>

      </div>
    </div>
  );
};

export default Dashboard;