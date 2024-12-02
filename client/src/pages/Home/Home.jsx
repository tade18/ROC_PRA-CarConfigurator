import React from 'react'
import Header from '../../components/Header/Header'
import Poster from '../../components/Poster/Poster'
import Footer from '../../components/Footer/Footer'
import ConfiguratorAd from '../../components/ConfiguratorAd/ConfiguratorAd'

export default function Home() {
  return (
    <>
        <Header />
        <Poster />
        <ConfiguratorAd />
        <Footer />
    </>
  )
}
