import React, { Suspense } from 'react'
import "./Banner.css"
import firstbanner from '../../images/firstbanner.jpg'
import secondbanner  from '../../images/secondbanner.jpg'
import thirdbanner  from '../../images/thirdbanner.jpg'
import { Button } from 'react-bootstrap'



export default function Banner() {

  return (

    <div className='container'>

      <div className='row'>
        <div className='col-lg-6 firstInnerDiv'>
               <p className='firstText'> Best learning platform</p>
               <p style={{fontFamily:'Lora',fontSize:'55px'}}>Getting Best Quality Educations Is Now More Easier.</p>
               <p className='secondText'>BeginTheToutor is an educational platform, which like edX, aims at delivering college-level education and quality training globally.
                It offers online degrees, specialized courses, and one-off activities, delivered by renowned partner universities from all over the world.</p>
               <Button className='rounded-pill'>Join courses</Button>
        </div>
        {/* <div className='col-lg-6 firstInnerDiv '>
          <div className='justify-content-center firstSubInnerDiv' style={{marginTop:'35px',display:'flex'}}>
            <div className='d-flex flex-column justify-content-center'>
                <div className= ' p-1 border border-3 border-black ms-2 m2-2 secondSubInnerDiv' style={{height:'213px'}}>

                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${firstbanner})`,height:'200px',backgroundSize:'cover'}} >

                  </div>

                </div>
                <div className=' p-1 border border-3 border-black ms-2 m2-2 mt-2 secondSubInnerDiv' style={{height:'213px'}}>
                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${secondbanner})`,height:'200px',backgroundSize:'cover'}} >

                  </div>
                </div>
            </div>
            <div>
                <div className='p-1 border border-3 border-black ms-2 m2-2 secondSubInnerDiv' style={{height:'170px'}}>
                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${thirdbanner})`,height:'157px',backgroundSize:'cover'}} >
                     
                  </div>
                </div>
                <div className='p-1 border border-3 border-black ms-2 m2-2 mt-2 secondSubInnerDiv' style={{height:'170px'}}>
                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${firstbanner})`,height:'157px',backgroundSize:'cover'}} >
                    
                  </div>
                </div>
                <div className='p-1 border border-3 border-black ms-2 m2-2 mt-2 secondSubInnerDiv' style={{height:'170px'}}>
                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${firstbanner})`,height:'157px',backgroundSize:'cover'}} >
                    
                  </div>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center'>
                <div className='p-1 border border-3 border-black ms-2 m2-2 secondSubInnerDiv' style={{height:'213px'}}>
                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${firstbanner})`,height:'200px',backgroundSize:'cover'}} >

                  </div>
                </div>
                <div className='p-1 border border-3 border-black ms-2 m2-2 mt-2 secondSubInnerDiv' style={{height:'213px'}}>
                  <div className='thirdSubInnerDiv' style={{backgroundImage:`url(${firstbanner})`,height:'200px',backgroundSize:'cover'}} >

                  </div>
                </div>
            </div>

          </div>



        </div> */}

        
      </div>

    

    </div>

  )
}


