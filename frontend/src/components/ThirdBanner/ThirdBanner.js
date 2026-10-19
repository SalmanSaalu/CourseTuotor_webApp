import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import './ThirdBanner.css'
import firstbanner from '../../images/firstbanner.jpg'
import secondbanner  from '../../images/secondbanner.jpg'
import teach from '../../images/teach.jpg'
import { Button } from 'react-bootstrap';
import { BiSolidRegistered } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'
import Corousel from '../Corousel/Corousel'
import axios from 'axios'
import { userBrowseCourseActions } from '../../actions/userCourseActions'
import { Link,useNavigate } from 'react-router-dom'
function ThirdBanner() {
    const [topcourse,setTopcourse]=useState([])
    const userLogin=useSelector(state=>state.userLogin)
    const {error,userInfo}=userLogin
    useEffect(()=>{
        
        const getData = async () => {
            const response = await axios.get(
                `courses/topCourses/`
            );
            
            setTopcourse(response.data)
            // console.log(topcourse)
        };
        getData() 
    },[])

    // const browseBasedonPoints=(e,courseName)=>{

    // }

  return (
    <div className='container pt-5 text-center' style={{marginTop:"30px"}}>
      <h1>Browse Course By Category</h1>
      <p style={{fontSize:'13px',color:'grey',fontFamily:'Ysabeau Infant'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
      <Corousel/>
     
     <h1 style={{marginTop:'-7rem'}}>Our Most Popular Courses</h1>
     <div style={{marginTop:'4rem'}}>
        <div className='d-flex row AlltopCourse' style={{marginLeft:'5px',marginRight:'5px',paddingLeft:'4rem'}}>
            
            {Array.isArray(topcourse) && topcourse.length > 0 ? (
            topcourse.map((number, index) => (
                <Link
                    to="/browsePopular"
                    key={number.id || index}
                    className="col-sm-3 mt-3 topCourse"
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                        cursor: 'pointer',
                        width: '15rem',
                        height: '14rem',
                        boxShadow: '1px 1px 4px 1px grey',
                        padding: '6px',
                        marginLeft: '5px',
                        marginRight: 'auto'
                    }}
                >
                    <div
                    style={{
                        backgroundImage: number.courseImage
                            ? `url("${number.courseImage}")`
                            : 'none',
                        backgroundColor: '#f0f0f0',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '14.2rem',
                        height: '9rem',
                        borderRadius: '10px'
                    }}
                    />

                    <div style={{ marginTop: '15px' }}>
                        <p className="captionForCourses">
                            {number.courseName}
                        </p>

                        <p
                            className="captionForCourses"
                            style={{ marginTop: '-17px' }}
                        >
                            {number.email}

                            <span style={{ float: 'right' }}>
                                <BiSolidRegistered
                                    style={{ marginTop: '-3px' }}
                                />
                                {number.points}
                            </span>
                        </p>
                    </div>
                </Link>
            ))
        ) : (
            <p className="text-muted">
                No popular courses available.
            </p>
        )}
        </div>


     </div>
     <div className='expertTutorContainer' style={{width:'100%',paddingTop:'5rem'}}>
        <div className='expertTutors' style={{paddingTop:'3rem'}}>
            <h1 style={{textAlign:'left'}}>We Have Highly Expert & Experienced Tutors</h1>
            <p className='subHeadContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            <Button className='rounded-pill border-0' style={{float:'left'}} >Read More</Button>
        </div>
        <div className='expertTutorspic'  style={{display:'flex',justifyContent:'center'}}>
            <div className='innerImage' style={{backgroundImage:`url(${teach})`,width:'100%',height:'25rem',borderRadius:'10px'}}>

            </div>
        </div>
        
     </div>

    </div>
  )
}

export default ThirdBanner
