import React from 'react';
import { Notebook, Brain, MessageCircle } from 'lucide-react';

const Features = () => {
  return (
    <section id="howitworks" className="pt-2 min-h-screen flex items-center justify-center bg-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
          <div className="bg-neutral-50 p-4 rounded shadow-xl flex flex-col items-center text-center">
            <Notebook className="w-12 h-12 text-blue-900 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-blue-900">Write Journals</h3>
            <p className="text-gray-800 mb-4">Keep track of your thoughts in the form of journals, log your daily mood details & revisit them later right from your Cerospace dashboard</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded shadow-xl flex flex-col items-center text-center">
            <Brain className="w-12 h-12 text-green-700 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-blue-900">CBT & Narrative Therapy</h3>
            <p className="text-gray-800 mb-4 ">Get rid of negative thoughts and get a fresh perspective on life by practicing proven techniques like Cognitive Behavioral Therapy & Narrative Therapy</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded shadow-xl flex flex-col items-center text-center">
            <MessageCircle className="w-12 h-12 text-pink-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-blue-900">AI therapist & chatbot</h3>
            <p className="text-gray-800 mb-4">An empathic AI therapist at your disposal 24*7 & a chatbot trained on CBT & Narrative therapy. Live voice conversation with sentiment analysis right from your dashboard</p>
          </div>
        </div>
    </section>
  )
}

export default Features
