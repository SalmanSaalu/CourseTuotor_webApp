import { useEffect, useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux'
import React from 'react'
import axios from 'axios'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link,useNavigate } from 'react-router-dom'
import BrowseCategScreen from '../../screens/browseCategory/BrowseCategScreen'
function Corousel() {

  const navigate=useNavigate()
const [allcourses,setAllcourses]=useState([])
const userLogin=useSelector(state=>state.userLogin)
const {error,userInfo}=userLogin

    useEffect(()=>{

        const getData = async () => {
            const response = await axios.get(
                `courses/allcourses/`
            );
            
            setAllcourses(response.data)
            // console.log(response.data)
        };
        getData() 
        
      },[]);

    useEffect(()=>{
// console.log(userInfo)
    },[allcourses])
        


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }}  
  return (
    <Carousel 
    object={5}
    swipeable={true}
    draggable={true}
    showDots={false}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    
    autoPlaySpeed={1000}
    keyBoardControl={true}
    customTransition="transform 300ms ease-in-out"
    transitionDuration={500}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile","desktop","superLargeDesktop"]}
     otListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    
    >
        {
            allcourses.map((number,index)=> 
            userInfo ?
            <Link to={"/browseCategory/"+number["courseTypeName"]} style={{textDecoration:'none',color:'black'}} >   
            <div key={index} 
            // onClick={() => {
            //   /* 1. Navigate to the Details route with params */
            //   navigate('/browseCategory', {
            //     name: number["courseTypeName"],
            //   });
            // }}
            style={{borderRadius:'5px',padding:'5px',cursor:'pointer'}}>
              
            <div style={{backgroundImage:`url(${number['courseImage']})`,height:'10rem',borderRadius:'15px',backgroundSize:'cover',paddingTop:'4rem'}}>
                   <p className='text-center' style={{backgroundColor:'white',opacity:'0.8',fontSize:'20px',fontFamily:'Inclusive Sans',fontWeight:'700'}} >{number['courseTypeName']}</p>
            </div>
            </div>
            </Link>  
            :
            <Link to="/signin" style={{textDecoration:'none',color:'black'}} >   
            <div key={index} style={{borderRadius:'5px',padding:'5px',cursor:'pointer'}}>
              
            <div style={{backgroundImage:`url(${number['courseImage']})`,height:'10rem',borderRadius:'15px',backgroundSize:'cover',paddingTop:'4rem'}}>
                   <p className='text-center' style={{backgroundColor:'white',opacity:'0.8',fontSize:'20px',fontFamily:'Inclusive Sans',fontWeight:'700'}} >{number['courseTypeName']}</p>
            </div>
            </div>
            </Link>  
            )
        }


      
   </Carousel>
  )
}

export default Corousel
