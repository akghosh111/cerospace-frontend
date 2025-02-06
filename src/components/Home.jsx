import React from 'react'
import Features from './Features'
import ResourcesSection from './ResourcesSection'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    <section id="home" className="pt-24 min-h-screen flex items-center justify-center bg-blue-100">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-blue-900">
        Clear Your Mind, Change Your Life
        
      </h1>
      <p className="text-xl sm:text-2xl text-gray-600 mb-8 font-light">
      Cerospace gives you practical CBT tools to help you manage stress, challenge negative thinking, and unlock your full potential.
        
      </p>
      <div className="flex justify-center gap-4">
        <a href="/login" className="px-6 py-3 shadow-xl bg-lime-300 text-white-100 rounded-lg hover:bg-lime-350 transition-colors">
          Begin Your Journey
        </a>
        <a href="#resources" className="px-6 py-3 shadow-xl bg-neutral-50 text-green-700 rounded-lg hover:bg-lime-300 transition-colors border-dotted border-1">
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
<Features/>
<ResourcesSection/>
<Footer/>
</>
)
}

export default Home
