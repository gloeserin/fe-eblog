import React from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ArticleCard from './components/ArticleCard'
import Footer from './components/Footer'

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ArticleCard />
      <Footer />
    </div>
  )
}
