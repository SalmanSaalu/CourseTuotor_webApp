import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import { useParams,useLocation,useNavigate} from 'react-router-dom'
import {Navigationbar} from '../../components/Navigation/Navigationbar'
import {BiSolidRightArrow  } from 'react-icons/bi'
import './BrowsePopular.css'
import { userBrowseCourseActions,userCourseEnrollActions,userCourseEnrollDetailsActions } from '../../actions/userCourseActions'
function BrowsePopular() {
    const params=useParams()
    const navigate=useNavigate()
    const userLogin=useSelector(state=>state.userLogin)
    const {error,userInfo}=userLogin

    const userBrowseCourseData=useSelector(state=>state.userBrowseCourseData)
    const {loading,userBrowseCourse}=userBrowseCourseData

    const userCourseEnrollData=useSelector(state=>state.userCourseEnrollData)
    const {userCourseEnroll}=userCourseEnrollData

    const userCourseEnrollDetailsData=useSelector(state=>state.userCourseEnrollDetailsData)
    const {userCourseEnrollDetails}=userCourseEnrollDetailsData
    const dispatch=useDispatch()
    

    useEffect(()=>{ 
        if(userInfo){
            dispatch(userBrowseCourseActions("coursename","popularBased"))      
            dispatch(userCourseEnrollDetailsActions())
        }else{
            navigate("/signin")
        }      
    },[])

    const getCourseLengthInfo=(name)=>{
        if (name.length > 24){
            name = name.substring(0,24)+'...';
            return name
        }
        else{
            return name
        }
    }

    const enrollment=(e,courseName)=>{
        e.preventDefault()
        dispatch(userCourseEnrollActions(courseName))
        window.location.reload()
    }
  return (
    <div>
      <Navigationbar/>
      <div className='container'>
                    <div style={{textAlign:'center'}}>
                        <h3 style={{marginTop:'4rem',fontFamily:'Poltawski Nowy'}}><span style={{color:'black'}}>Browse By Popular </span></h3>       
                    </div>
                    <div>
                        <div className='row' style={{display:'flex',justifyContent:'center'}}>
                            {
                                userBrowseCourse &&
                                userBrowseCourse.map((number,index)=>

                                <div key={index} className='col-2' style={{width:'15rem',height:'auto',margin:'1rem 0.5rem',boxShadow:'0px 0px 5px -1px grey'}}>
                                    {/* <div className='courseName' style={{backgroundImage:`url(${number['courseImage']})`,backgroundSize:'cover'}}>
                                    </div> */}
                                    <img src={number['courseImage']} style={{width:'15rem',marginLeft:'-12px',backgroundSize:'cover',height:'10rem'}}></img>

                                    <div className='coursecategDetailDiv' style={{height:'auto',paddingBottom:'1rem'}}>
                                        <p style={{fontSize:'17px',color:'#5a5050',fontFamily:'Poltawski Nowy',marginTop:'-1rem'}}> {getCourseLengthInfo(number['courseName'])}</p>
                                        <p style={{marginTop:'-6px',color:"grey",fontSize:'13px',fontFamily:'Crimson Text'}}>{number['email']}</p>
                                        <p style={{marginTop:'-21px',color:'#6396e6',fontFamily:'Crimson Text',fontSize:'14px'}}>students enrolled : {number['points']}</p>

                                        { number['user']!==userInfo.id ?
                                               number['enrollment_status']===true?
                                                <button key={index} className='enrollButton' onClick={() => window.location.href = number.credential}>Watch video</button>
                                                :
                                                <button key={index} className='enrollButton' onClick={(e)=>enrollment(e,number['courseName'])}>Enroll now</button>
               
                                            :
                                            <button className='enrollButton' >Add by you</button>


                                        }
                                    </div>
                                </div>
                                )
                            }

      
                        </div>
                    </div>
                    
                </div>
    </div>
  )
}

export default BrowsePopular
