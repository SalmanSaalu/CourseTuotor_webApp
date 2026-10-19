import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navigation.css"
import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import  Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link,useNavigate } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { premiumCourseEnrollAction } from '../../actions/premiumCourseActions'
import axios from 'axios'

export function Navigationbar() {
  const userLogin=useSelector(state=>state.userLogin)
  const {error,loading,userInfo}=userLogin
  const [profile,setProfile]=useState(true)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const premiumCourseEnrollData=useSelector(state=>state.premiumCourseEnrollData)
  const {premiumEnrolled}=premiumCourseEnrollData


  useEffect(()=>{
    if(userInfo){
       setProfile(false)
       if(premiumEnrolled===undefined){
        dispatch(premiumCourseEnrollAction())
       }
    }
    else{
      setProfile(true)
    }
},[userInfo])

  const logoutHandler=()=>{
      dispatch(logout)
  }
  

  const premiumCourseHandler=(e)=>{
    e.preventDefault()
    if(userInfo){
      // console.log("signedIn")
  
      if(premiumEnrolled && premiumEnrolled.response==='true'){
          navigate("/premiumCourse/premiumCourseRegister")
        }
      if(premiumEnrolled && premiumEnrolled.response==='false'){
        navigate("/premiumCourse")
      }
      
      // console.log(premiumEnrolled)
  
  }else{
      navigate("/signin")
  }
  }
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{}} className=''>
          <Navbar.Brand href="#home" style={{color:'blue'}} className='fw-bold'><span style={{color:'black',fontFamily:'Ysabeau Infant'}}>Begin</span>TheToutor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='md-d-flex justify-content-between'>
            <Nav>

            </Nav>
            <Nav style={{color:'grey',fontWeight:'600',fontSize:'15px'}} >
              <Nav.Link href="/" className='ps-lg-3 '>Home</Nav.Link>
              
              
              {profile===false?
              <NavDropdown title="Premium Courses" id="basic-nav-dropdown"  className='ps-lg-3 '>
                <NavDropdown.Item ><Link className='premium' style={{textDecoration:'none'}} onClick={(e)=>premiumCourseHandler(e)} >Register Premium Courses</Link></NavDropdown.Item>
                <NavDropdown.Item >
                <Link className='premium' style={{textDecoration:'none'}} to='/premiumCourse'> Purchase Premium Courses</Link>
                </NavDropdown.Item>

              </NavDropdown>
              :""}
             
            </Nav>
            <Nav className=''>
              {profile===false ? <Nav className='signup fw-bold'><Link to='/profile' style={{textDecoration:'none',color:'black'}}>profile</Link></Nav>:<Nav className='signup fw-bold'><Link to='/signup' style={{textDecoration:'none',color:'black'}}>Sign up</Link></Nav>}
              {profile === false ? <Link to='/' style={{textDecoration:'none',color:'black'}}><Button className='login rounded-pill border-0 fw-bold' onClick={logoutHandler}>Sign out</Button></Link>:<Link to='/signin' style={{textDecoration:'none',color:'black'}}><Button className='login rounded-pill border-0 fw-bold'>Sign In</Button></Link>}
            
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }









