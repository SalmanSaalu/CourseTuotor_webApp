import React from 'react'
import {Navigationbar} from '../components/Navigation/Navigationbar'
import Banner from '../components/Banner/Banner'
import Speciality from '../components/Banner/Speciality'
import BannerSecond from '../components/SecondBanner/BannerSecond'
import ThirdBanner from '../components/ThirdBanner/ThirdBanner'
import Footer from '../components/Footer/Footer'

function HomeScreen() {
  
  return (
    <div>
        <Navigationbar/>
        <Banner/>
        <Speciality/>
        <BannerSecond/>
        <ThirdBanner/>
        <Footer/>
        
    </div>
  )
}

export default HomeScreen

