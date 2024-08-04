"use client";

import React from 'react'
import Hero from '@/app/components/Hero'
import { Footer } from './components/Footer';
import FeaturedSection from './components/FeaturedSection';




const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <Footer />
    </div>
  )
}

export default Home
