import React,{useState,useEffect} from 'react'
import './PremiumCourseProfileScreen.css'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useLocation,useNavigate, Link} from 'react-router-dom'
import {premiumClassEnrollProfileAction } from '../../../actions/premiumCourseActions'
import axios from 'axios'
import Chat from '../../chat/Chat'
function PremiumCourseProfileScreen() {
    
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userLogin=useSelector(state=>state.userLogin)
    const {error,userInfo}=userLogin

    const premiumClassEnrollProfileData=useSelector(state=>state.premiumClassEnrollProfileData)
    const {loading,premiumClassProfile}=premiumClassEnrollProfileData


    

    useEffect(()=>{
        if(userInfo){
            if(!premiumClassProfile){
                dispatch(premiumClassEnrollProfileAction())
            }
        }else{
            navigate("/")
        }
    },[premiumClassProfile])

    const getCourseLengthInfo=(name)=>{
        if (name.length > 24){
            name = name.substring(0,24)+'...';
            return name
        }
        else{
            return name
        }
    }

  return (
    <div className='container'>
      <h3 className='headForRegister'><span>Enrolled Courses</span></h3>
      <hr style={{border:'2px solid #0ba9f2',opacity:"1"}}/>
      <div className='row' style={{display:'flex',justifyContent:'center',marginTop:'3rem'}}>
           {premiumClassProfile && !premiumClassProfile.detail ?
            premiumClassProfile.map((number,index)=>
                <div key={index} style={{marginTop:'1rem',marginBottom:'1rem'}}>
                    <div  className='row'  style={{boxShadow:'0px 0px 5px -1px grey',height:'auto'}}>
                        <div  className='col-md-4' style={{padding:'1rem'}}>
                            <p>
                            <span className='coursename'> {getCourseLengthInfo(number['courseFullname'])}</span><br/>
                            <span className='coursetype'>{number['coursetypename']}</span><br/>
                            <span className='others'>{number['teachername']}</span><br/>
                            <span className='others'>{number['coursedays']}</span><br/>
                            <span className='others'>{number['coursetime']}</span><br/>
                            <span className='others'>students enrolled</span><br/>
                            <span className='others'>Amount $ {number['FullAmount']}</span><br/>
                            </p>
                        </div>
                        <div  className='col-md-4 secondSmallDiv' style={{padding:'1rem',paddingTop:'5rem'}}>
                            <p>
                            <span className='others'>Message will be sent to your mobile at the time schedule</span><br/>     
                            <Link  to={`/chat/${number['teacher_id']}`} state={{'teacherName':number['teachername']}}><button>Chat</button></Link>
                            
                            </p>
                        </div>
                        <div className='col-md-4'>
                        <img src={number['courseimage']} style={{width:'100%',backgroundSize:'cover',height:'auto'}}></img>
                        </div>
                    </div>

                 
                </div>
          
             
            ):<h3 className='headForRegister' style={{marginTop:'0rem'}}>No data</h3>}
            
        </div>
    </div>
  )
}

export default PremiumCourseProfileScreen
