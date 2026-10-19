import React, { useState, useEffect,useRef }  from 'react'
import { useInView } from 'react-intersection-observer';
import './Banner.css'
function Speciality () {
    const [countForSuccess, setCountForSuccess] = useState(0);
    const [countForIntegrity,setCountForIntegrity]=useState(0);
    const [countForLearning, setCountForLearning] = useState(0);
    const [countForExpert, setCountForExpert] = useState(0);
    
    
    const { ref, inView } = useInView({
          /* Optional options */
          threshold: 0,
        });

    useEffect(() => {
        console.log(inView)
        if(inView){
        //Implementing the setInterval method
        const interval = setInterval(() => {
            if(countForSuccess < 80){
                setCountForSuccess(countForSuccess + 1);
            }
            if(countForExpert < 100){
                setCountForExpert(countForExpert+1)
            }
            if(countForExpert < 100){
                setCountForLearning(countForLearning+1)
            }
            if(countForIntegrity < 220){
                setCountForIntegrity(countForIntegrity+1)
            }
            

        }, 10);

        return () => clearInterval(interval);

        }

        else if(inView===false){
            setCountForExpert(0)
            setCountForSuccess(0)
            setCountForIntegrity(0)
            setCountForLearning(0)
        }
       
    }, [countForIntegrity,inView]);

        return (
            <div style={{backgroundColor:"blue",height:'8rem',color:'white'}} className='mt-5 '>


                <div className='container'>
                <div className='row pt-4' ref={ref}>
                    <div className='col-3 text-center SpecialityDiv'  >
                        <h2>{countForSuccess}K+</h2>
                        <p style={{fontFamily:'Josefine',fontSize:'16px'}}>Success Stories</p>
                    </div>
                    <div className='col-3 text-center SpecialityDiv' >
                        <h2>{countForExpert}+</h2>
                        <p style={{fontFamily:'Josefine',fontSize:'16px'}}>Expert Instructors</p>
        
                    </div>
                    <div className='col-3 text-center SpecialityDiv'>
                        <h2>{countForLearning}K+</h2>
                        <p style={{fontFamily:'Josefine',fontSize:'16px'}}>Learning Students</p>
                    </div>
                    <div className='col-3 text-center'  >
                        <h2>{countForIntegrity}K+</h2>
                        <p style={{fontFamily:'Josefine',fontSize:'16px'}}>Integrity Subjects</p>
                    </div>
                </div>
                </div>
             
            </div>
          )
    
 
}

export default Speciality
