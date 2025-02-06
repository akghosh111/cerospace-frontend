import React from 'react';

const Resources = () => {
  const meditationVideos = [
    {
      title: "10-Minute Meditation for Anxiety",
      url: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
      duration: "10 mins",
      description: "A quick guided meditation perfect for beginners dealing with anxiety"
    },
    {
      title: "Deep Sleep Guided Meditation",
      url: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
      duration: "30 mins",
      description: "Calming meditation to help you fall asleep naturally"
    },
    {
      title: "Morning Meditation for Positive Energy",
      url: "https://www.youtube.com/watch?v=gwgXtV1uG2M",
      duration: "15 mins",
      description: "Start your day with positive energy and mindfulness"
    }
  ];

  const articles = [
    {
      title: "Understanding and Managing Depression",
      url: "https://www.helpguide.org/articles/depression/depression-symptoms-and-warning-signs.htm",
      source: "HelpGuide.org",
      description: "Comprehensive guide on recognizing and managing depression symptoms"
    },
    {
      title: "Coping with Anxiety: Practical Strategies",
      url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care/",
      source: "Mind.org",
      description: "Self-help strategies and techniques for managing anxiety"
    },
    {
      title: "Building Emotional Resilience",
      url: "https://www.apa.org/topics/resilience",
      source: "American Psychological Association",
      description: "Learn how to build and strengthen your emotional resilience"
    }
  ];

  const helplines = [
    {
      name: "iCall (TISS)",
      number: "9152987821",
      hours: "24/7",
      description: "A mental health support service from Tata Institute of Social Sciences that offers free and anonymous counseling."
    },
    {
      name: "Kiran Helpline",
      number: "1800-599-0019",
      hours: "24/7",
      description: "Government of India’s mental health helpline available at 1800-599-0019."
    },
    {
      name: "Vandrevala Foundation Helpline",
      number: "1860 266 2345",
      hours: "24/7",
      description: "24/7 mental health support through phone and email for individuals in distress."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-12 text-center">Mental Health Resources</h1>

        {/* Guided Meditation Videos Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Guided Meditation Videos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meditationVideos.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium text-blue-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-2">{video.description}</p>
                <p className="text-sm text-gray-500 mb-3">Duration: {video.duration}</p>
                <a 
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Watch Video →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Articles and Resources Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Helpful Articles & Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium text-blue-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-2">{article.description}</p>
                <p className="text-sm text-gray-500 mb-3">Source: {article.source}</p>
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Crisis & Helpline Numbers Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Crisis & Helpline Numbers</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {helplines.map((helpline, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">{helpline.name}</h3>
                  <p className="text-gray-600 mb-2">{helpline.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-blue-600">{helpline.number}</span>
                    <span className="text-sm text-gray-500">Available {helpline.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            If you're experiencing a medical emergency, please dial 911 or visit your nearest emergency room.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;