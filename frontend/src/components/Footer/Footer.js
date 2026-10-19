import React from 'react'
import './Footer.css'
import { AiFillPhone,AiFillInstagram,AiFillLinkedin } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import {BiLogoGmail  } from 'react-icons/bi'
import Navbar from 'react-bootstrap/Navbar';
function Footer() {
  return (
    <div style={{height:'auto',backgroundColor:'blue',marginTop:'7rem'}}>
        <div className='container'>
            <div className='row footer' style={{paddingTop:'6rem',paddingBottom:'3rem'}}>
              <div className='col-md-4 leftfooter'>
                <Navbar.Brand href="#home" style={{color:'white'}} className='fw-bold'><span style={{color:'black'}}>Begin</span>TheToutor</Navbar.Brand><br/>
                <p className='rightFootFont'>A complete study platform for any individuals</p>
                <p><AiFillInstagram/>&nbsp;&nbsp;<BiLogoGmail/>&nbsp;&nbsp;<AiFillLinkedin/></p>
              </div>
              <div className='col-md-2 col-sm-3 rightfooter'>
                  <p>About us</p>
                  <p className='rightFootFont'>Innovative</p>
                  <p className='rightFootFont'>Leading teams</p>
                  <p className='rightFootFont'>Consistency</p>
                  <p className='rightFootFont'>Responsibilty</p>
              </div>
              <div className='col-md-2 col-sm-3 rightfooter'>
                  <p>Contact us</p>
                  <p className='rightFootFont'><AiFillPhone/> 9946371099</p>
                  <p className='rightFootFont'><AiFillPhone/> 9078833422</p>
                  <p className='rightFootFont'><MdEmail/> salmanpp05@gmail.com</p>
                  <p className='rightFootFont'><AiFillInstagram/> sal_mn</p>
              </div>
              <div className='col-md-2 col-sm-3 rightfooter'>
                  <p>Courses</p>
                  <p className='rightFootFont'>school level</p>
                  <p className='rightFootFont'>college level</p>
                  <p className='rightFootFont'>Coachings</p>
                  <p className='rightFootFont'>internships</p>
              </div>
              <div className='col-md-2 col-sm-3 rightfooter'>
                  <p>Partners</p>
                  <p className='rightFootFont'>Ecom</p>
                  <p className='rightFootFont'>Tefora</p>
                  <p className='rightFootFont'>bluegens</p>
              </div>

            </div>
            <p style={{textAlign:'center',color:'white',fontFamily:'Lora',fontSize:'10px',margin:'auto'}}>&#169; copyright owned by BeginTheTutor</p>
        </div>
    </div>
  )
}

export default Footer
