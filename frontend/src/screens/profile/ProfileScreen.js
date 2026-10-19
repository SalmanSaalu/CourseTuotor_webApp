import React,{useState,useEffect,useRef} from 'react'
import './ProfileScreen.css'
import { useSelector,useDispatch } from 'react-redux'
import { Navigationbar } from '../../components/Navigation/Navigationbar'
import student from '../../images/student.jpg'
import beginerAchievement from '../../images/beginerAchievement.jpg'
import secondLevelAchievement from '../../images/secondLevelAchievement.jpg'
import thirdlevel from '../../images/thirdlevel.jpg'
import fourthlevel from '../../images/fourthlevel.jpg'
import endlevel from '../../images/endlevel.jpg'
import profile from '../../images/profile1.jpg'
import education from '../../images/profile2.jpg'
import pic from '../../images/picicon.jpg'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { BiSolidBookAlt } from 'react-icons/bi'
import { PiCertificateFill } from 'react-icons/pi'
import { ImPlus } from 'react-icons/im'
import {AiFillDelete,AiFillEdit } from 'react-icons/ai'
import { MdOutlineDownloadDone  } from 'react-icons/md'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {  userProfileDetailsActions } from '../../actions/userProfileActions'
import { userCourseRegisterActions,userCourseRegisterDetailActions,userCourseDelete,userCourseEnrollDetailsActions } from '../../actions/userCourseActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function ProfileScreen() {
  const [profileRegister,setProfileRegister]=useState(true)

  // personal details
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phonenumber,setPhonenumber]=useState('')
  const [dateOfBirth,setDateOfBirth]=useState('')
  const [about,setAbout]=useState('')
  const [position,setPosition]=useState('')
  const [address,setAddress]=useState('')
  const [gender,setGender]=useState('')
  const [image,setImage]=useState(null)
  const [sendImageData,setSendImage]=useState(null)

  // for educational details
  const [currentQualification,setCurrentQualification]=useState('')
  const [institution,setInstitution]=useState('')
  const [course,setCourse]=useState('')
  const [degree,setDegree]=useState('')
  const [InstitutionTotalData,setInstitutionTotalData]=useState({})
  const [courseTotalData,setCourseTotalData]=useState({})
  const [degreeTotalData,setDegreeTotalData]=useState({})
  const [messageForAddingtab,setMessageForAddingTab]=useState('')



  // for carousel
  const [numberPass,setNumberPass]=useState(2)
  const [nums,setNum]=useState([1])
  const [editField,setEditfield]=useState('')


  // for edit course
  const [editButtonClick,setEditButtonClick]=useState(false)
  const [editId,setEditId]=useState("")

  //for delete course
  const [deleteCourse,setDeletecourse]=useState("")
  const [deleteCourseName,setDeleteCourseName]=useState("")

  // for courseRegister
  const [registerCourse,setRegisterCourse]=useState(false)
  const [showInputNotFilled,setshowInputNotFilled]=useState(false)
  const [courseName,setCourseName]=useState("")
  const [courseType,setCourseType]=useState("")
  const [credential,setCredential]=useState("")
  const [registeredCourse,setRegisteredCourse]=useState([])
  const [enrolledCourses,setEnrolledCourses]=useState([])
  const [courseImage, setCourseImage] = useState(null);
  const [courseImagePreview, setCourseImagePreview] = useState("");
  //server data
  const userLogin=useSelector(state=>state.userLogin)
  const {error,userInfo}=userLogin

  const userProfileData=useSelector(state=>state.userProfileData)
  const {loading,userProfile}=userProfileData

  const userCourseRegisterData=useSelector(state=>state.userCourseRegisterData)
  const {userCourseRegister,loadingForCourseRegister}=userCourseRegisterData

  const userCourseRegisterDetailData=useSelector(state=>state.userCourseRegisterDetailData)
  const {userCourseRegisterDetail}=userCourseRegisterDetailData

  const userCourseEnrollDetailsData=useSelector(state=>state.userCourseEnrollDetailsData)
  const {userCourseEnrollDetails}=userCourseEnrollDetailsData

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const inputRef = useRef()
  const formData = new FormData()


  useEffect(()=>{
    if(userInfo){
      dispatch(userCourseRegisterDetailActions())
      dispatch(userCourseEnrollDetailsActions())
      if(userInfo.email){
        setUsername(userInfo.email)
        setEmail(userInfo.email)
      }
      dispatch(userProfileDetailsActions(userInfo.id))   
    }else{
      navigate("/signin")
    }
    
     
  },[nums,InstitutionTotalData,editField,image])


useEffect(()=>{
      if(userProfile){
      if(userProfile.detail ==='No profile Data'){
        setProfileRegister(true)
      }
      else{
        setProfileRegister(false)
      }
    }
    if(userCourseRegisterDetail && userCourseRegisterDetail.detail ===undefined){
      setRegisteredCourse(userCourseRegisterDetail)
    }
    if(userCourseEnrollDetails && userCourseEnrollDetails.detail===undefined){
      setEnrolledCourses(userCourseEnrollDetails)
      // document.getElementById("yourCourse").style.marginTop="-7rem"
    }
   
},[userProfile,registerCourse,showInputNotFilled,userCourseRegisterDetail,userCourseEnrollDetails])


useEffect(()=>{
if(loadingForCourseRegister){
  
}
},[userCourseRegister,loadingForCourseRegister])

  const addButton=(e,num)=>{
    if(institution !== ''  && course !== '' && degree!==''){
     
      var key = nums[nums.length - 1];
      
      var updatedValueInstitution = {};
      var updatedValueCourse={};
      var updatedValueDegree={};
      updatedValueInstitution[key] = institution;
      updatedValueCourse[key]=course;
      updatedValueDegree[key]=degree;

      // console.log(updatedValue)
      setMessageForAddingTab('')
      setInstitution('')
      setCourse('')
      setDegree('')

      setInstitutionTotalData(InstitutionTotalData=> ({
        ...InstitutionTotalData,
        ...updatedValueInstitution
      }));

      setCourseTotalData(courseTotalData=>({
        ...courseTotalData,
        ...updatedValueCourse
      }))

      setDegreeTotalData(degeeTotalData=>({
        ...degeeTotalData,
        ...updatedValueDegree
      }))

      // console.log(InstitutionTotalData)
      // console.log(courseTotalData)
      // console.log(degreeTotalData)
      if(nums.length<5){
        // setNumberPass(num+1)
        
        const arrayNum =nums[nums.length - 1]+1
        setNum([...nums,arrayNum])
        
      }
    }
    else{
      setMessageForAddingTab('* please fill the current tab')
    }


  }


  const deleteData=(e,number)=>{
    console.log(number)
    // if(number in InstitutionTotalData){
    //   console.log(true)
    // }
    if(number in InstitutionTotalData){
      const dictLength=Object.keys(InstitutionTotalData).length
      for (let i = number; i < dictLength ;i++) {
        InstitutionTotalData[i]=InstitutionTotalData[i+1]
      }   
      delete InstitutionTotalData[dictLength] 
    }

    if(number in courseTotalData){
      const dictLength=Object.keys( courseTotalData).length
      for (let i = number; i < dictLength ;i++) {
        courseTotalData[i]= courseTotalData[i+1]
      }   
      delete  courseTotalData[dictLength] 
    }

    if(number in degreeTotalData){
      const dictLength=Object.keys(degreeTotalData).length
      for (let i = number; i < dictLength ;i++) {
        degreeTotalData[i]=degreeTotalData[i+1]
      }   
      delete degreeTotalData[dictLength] 
    }


    
      const copyArr = [...nums];
      copyArr.pop();
      setNum(copyArr);
      // console.log(nums)
      // console.log(InstitutionTotalData)
      // console.log(courseTotalData)
      // console.log(degreeTotalData)
   
  }


    const edit=(e,number)=>{
        setEditfield(number)
        setInstitution(InstitutionTotalData[number])
        setCourse(courseTotalData[number])
        setDegree(degreeTotalData[number])
       
    }

    const doneEdit=(e,number)=>{
      InstitutionTotalData[number]=institution
      courseTotalData[number]=course
      degreeTotalData[number]=degree
      setInstitution('')
      setCourse('')
      setDegree('')
      setEditfield('')
    }

  

    const onImageChange = (event) => {
     
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
        setSendImage(event.target.files[0])
      }
      // if (event.target.files && event.target.files[0]) {}
        
        

        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
  
        // console.log(image)
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //   setImage(e.target.result);
        // };
        // reader.readAsDataURL(event.target.files[0]);
        
        // console.log(image)
        // console.log(reader)
     }

    const registeringCourse = async () => {
      if (
        courseName.trim() &&
        credential.trim() &&
        courseType.trim()
      ) {
        try {
          await dispatch(
            userCourseRegisterActions(
              courseName.trim(),
              credential.trim(),
              courseType.trim(),
              null,
              courseImage
            )
          );

          setRegisterCourse(true);
          setshowInputNotFilled(false);
          window.location.reload();
        } catch (error) {
          console.error(
            'Course registration failed:',
            error.response?.data || error.message
          );
        }
      } else {
        setshowInputNotFilled(true);
      }
    };


    const editCourseData = (
      editCoursename,
      editCourseTypeName,
      editCourseCredentail
    ) => {
      setCourseName(editCoursename);
      setCredential(editCourseCredentail);
      setCourseType(editCourseTypeName);
      setEditId(editCoursename);
      setEditButtonClick(true);
    };

    
  const EditCurrentCourseData = async () => {
  if (!editId) {
    alert('Please select a course to edit.');
    return;
  }

  if (!courseName || !credential || !courseType) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    await dispatch(
      userCourseRegisterActions(
        courseName,
        credential,
        courseType,
        editId,
        courseImage
      )
    );

    window.location.reload();

  } catch (error) {
    console.error(
      'Course update failed:',
      error.response?.data || error.message
    );
  }
};


     const displayDeleteAlert=(e,courseId,courseName)=>{
      e.preventDefault()
      var modal = document.getElementById('myModal');
      modal.style.display = "block"
      setDeletecourse(courseId)
      setDeleteCourseName(courseName)
     }

     const closeDeleteAlert=()=>{
      var modal = document.getElementById('myModal');
      setDeletecourse("")
      setDeleteCourseName("")
      modal.style.display = "none";
     }

     const deleteCourseFunc = async (courseId) => {
      try {
          if (!courseId) {
              console.error("Course ID is missing");
              return;
          }

          await dispatch(userCourseDelete(courseId));

          // Clear the popup only after the request finishes.
          setDeletecourse("");
          setDeleteCourseName("");

          const modal = document.getElementById("myModal");
          if (modal) {
              modal.style.display = "none";
          }

          // Refresh the registered courses from Redux/backend.
          dispatch(userCourseRegisterDetailActions());

      } catch (error) {
          console.error("Failed to delete course:", error);
          alert("Unable to delete the course. Please try again.");
      }
  };

     const getCourseLengthInfo=(name)=>{
      if (name.length > 24){
          name = name.substring(0,24)+'...';
          return name
      }
      else{
          return name
      }
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }}  


    const responsiveForQualification = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }} 

  const option=(e,data)=>{
      e.preventDefault()

      
      if(data==='course'){
        console.log('course')
        
        document.getElementById("course").style.display = 'block';
        document.getElementById("education").style.display = 'none';
        document.getElementById("certificate").style.display = 'none';
        document.getElementById("user").style.display = 'none';
        }
      else if(data==='education'){
        console.log('edu')
        document.getElementById("course").style.display = 'none';
        document.getElementById("education").style.display = 'block';
        document.getElementById("certificate").style.display = 'none';
        document.getElementById("user").style.display = 'none';
        }
      else if(data==='certificate'){
        console.log('cert')
        document.getElementById("course").style.display = 'none';
        document.getElementById("education").style.display = 'none';
        document.getElementById("certificate").style.display = 'block';
        document.getElementById("user").style.display = 'none';
      } 
      else if(data==='user'){
        console.log('user')
        document.getElementById("course").style.display = 'none';
        document.getElementById("education").style.display = 'none';
        document.getElementById("certificate").style.display = 'none';
        document.getElementById("user").style.display = 'flex';
      }
    }

    const proceedHandler=()=>{
      setPosition(document.getElementById('position').value)
      setGender(document.getElementById('gender').value)
      formData.append("id",userInfo.id)
      formData.append("username",username)
      formData.append("email",email)
      formData.append("DateOfBirth",dateOfBirth)
      formData.append("about",about)
      formData.append("position",position)
      formData.append("gender",gender)
      formData.append("address",address)
      formData.append("profileImage",sendImageData)
      formData.append("phonenumber",phonenumber)
      formData.append("currentQualification",currentQualification)
      var a=JSON.stringify(InstitutionTotalData)
      formData.append("InstitutionTotalData",a)
      formData.append("courseTotalData",JSON.stringify(courseTotalData))
      formData.append("degreeTotalData",JSON.stringify(degreeTotalData))


      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      dispatch(userProfileDetailsActions(userInfo.id,formData))
    }
  return (
    <div style={{backgroundColor:'white'}}>
      <Navigationbar/>
      {profileRegister === true ?  
        
        <div style={{backgroundColor:'white'}} className='container'>
          
          
            <div style={{marginTop:'3rem'}}>
               <h4 className='head'>Complete your profile to unlock more features</h4>
               <div className='row firstRow'>
                    <div className='col-md-6' style={{paddingTop:'2rem',paddingLeft:'4rem',paddingBottom:'2rem'}}>
                        <h3 className='subHead'>Personal Details</h3>
                        <label className='labels'>Username</label><br/>
                        <input className='inputTypes' name='username' type='text' value={username} readOnly /><br/>
                        <label className='labels'>email</label><br/>
                        <input className='inputTypes' name='email' type='text' value={email} readOnly /><br/>
                        <label className='labels'>Date of birth</label><br/>
                        <input className='inputTypes' type='date' value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)}/><br/>
                        <label className='labels'>About</label><br/>
                        <input className='inputTypes' type='text' value={about} onChange={(e)=>setAbout(e.target.value)} /><br/>
                        <div className='d-flex positionGender' style={{}}>
                          <div className='w-50' style={{height:'28px'}}>
                            <label className='labels'>Position</label><br/>                
                            <select className='inputTypes' required name="position" id="position">
                                <option value='selected' select>-select-</option>
                                <option value="student">Student</option>
                                <option value="teacher" >Teacher</option>

                            </select>
                          </div>
                          <div className='w-50' style={{paddingLeft:'1rem',height:'28px'}}>
                            <label className='labels'>Gender</label><br/>
                            <select className='inputTypes' name="gender" id="gender">
                                <option value='selected' select>-select-</option>
                                <option value="male">male</option>
                                <option value="female" >female</option>

                            </select>
                          </div>

                        </div>
                        <label style={{marginTop:'5rem'}} className='labels'>Phonenumber</label><br/>
                        <input className='inputTypes' required type='tel' value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} /><br/>
                        <label className='labels'>Address</label><br/>
                        <input className='inputTypes' required type='text' value={address} onChange={(e)=>setAddress(e.target.value)}/><br/>
                        <label className='labels'>Profile picture</label><br/>
                        <div className='picIconDiv' >
                          <img  src ={ image ===null ?pic:image}  style={{width:'50%',height:'15rem'}} id = "image" alt='profile'/>
                        </div>
                        <input  type='file' name='profileImage' onChange={onImageChange} enctype='multipart/form-data' id='files' alt='profile'/>
                        
                       
   

                    </div>
                    <div className='col-md-6' style={{backgroundImage:`url(${profile})`,backgroundSize:'cover'}}>

                    </div>
               </div>
               <div className='row firstRow mt-0'>

                    <div className='col-md-6' style={{backgroundImage:`url(${education})`,backgroundSize:'cover'}}>

                    </div>
                    <div className='col-md-6' style={{paddingTop:'2rem',paddingLeft:'4rem',paddingBottom:'2rem'}}>
                        <h3 className='subHead'>Educational Details</h3>
                        <label className='labels'>Current Qualification</label><br/>
                        <input className='inputTypes' type='text' required value={currentQualification} onChange={(e)=>setCurrentQualification(e.target.value)}/><br/>
                        <div className='d-flex' style={{width:'100%'}}>
                        <label className='labels flex-grow-1' style={{paddingTop:'10px'}}>Add qualification details and Institutions</label>
                        {editField==='' &&<button  onClick={(e)=>addButton(e,numberPass)} className='plus' style={{marginTop:'16px'}}><ImPlus/></button> }                       
                        </div>
                        <p className='messageForTab'>{messageForAddingtab}</p>
                        <Carousel className='coro' style={{marginTop:'0rem!imporant'}}
                         
                          object={1}
                          swipeable={editField ==='' ?true:false}
                          draggable={true}
                          
                          showDots={true}
                          responsive={responsiveForQualification}
                          ssr={true} // means to render carousel on server-side.       
                          autoPlaySpeed={1000}
                          
                          customTransition="transform 300ms ease-in-out"
                          transitionDuration={500}
                          containerClass="carousel-container"
                          removeArrowOnDeviceType={["tablet", "mobile","desktop","superLargeDesktop"]}
                          otListClass="custom-dot-list-style"
                          itemClass="carousel-item-padding-40-px"
                          
                          >
                        {nums.map((number,index)=>{
                          return   <div  className='eduDetails' key={index}>
                          <div className='d-flex'>
                            <label className='labels flex-grow-1'>Institutions</label>
                            {InstitutionTotalData[number]? editField==='' ? <button className='delete' onClick={(e)=>deleteData(e,number)}><AiFillDelete/></button>:'':''}
                            {InstitutionTotalData[number] &&<button className='delete'  onClick={(e)=>edit(e,number)}><AiFillEdit/></button>}<br/>
                            {editField !=='' && <button className='delete'  onClick={(e)=>doneEdit(e,number)}><MdOutlineDownloadDone/></button>}
                          </div>

                          <input className='inputTypes' required value={InstitutionTotalData[number]?number === editField ? institution:InstitutionTotalData[number]:institution} onChange={(e)=>setInstitution(e.target.value)} type='text' /><br/>
                          <label className='labels'>Course</label><br/>
                          <input className='inputTypes' required value={courseTotalData[number]?number === editField ? course:courseTotalData[number]:course} onChange={(e)=>setCourse(e.target.value)} type='text' /><br/>
                          <label className='labels'>degree</label><br/>
                          <input className='inputTypes' required value={degreeTotalData[number]?number === editField ? degree:degreeTotalData[number]:degree} onChange={(e)=>setDegree(e.target.value)} type='text' /><br/>
                          </div>

                          

                        }                       
                        )}
                        </Carousel>
                    </div>

               </div>
                <div>
                  <div className='d-flex justify-content-center mt-4'>
                  <input style={{width:'16px'}} type='checkbox'/> <p className='lastCheckbox'>filled all my profile details and proceed</p>
                  </div>
                  <div className='d-flex justify-content-center'>
                  <button className='proceed' onClick={proceedHandler} type='submit'>Proceed</button>
                  </div>
                  
                </div>
            </div>
          


        </div>:

        <div style={{backgroundColor:'white',height:'auto',paddingBottom:'3rem',marginTop:'-8rem'}} className='container'>
          <div className='rightButtonContent'  style={{height:'auto',marginTop:'8rem',backgroundColor:'white',marginLeft:'-12px'}}>
                      <button onClick={(e) => option(e, "course")} className='options'><FaChalkboardTeacher/>&nbsp;&nbsp;courses</button>
                      <button onClick={(e) => option(e, "education")} className='options'><BiSolidBookAlt/>&nbsp;&nbsp;educations</button>
                      <button onClick={(e) => option(e, "certificate")} className='options'><PiCertificateFill/>&nbsp;&nbsp;Register courses</button>
                      <button onClick={(e) => option(e, "user")} className='options'><PiCertificateFill/>&nbsp;&nbsp;user</button>

                      <div id='course' value='course' >
                      <div style={{marginTop:'5rem',height:'18rem'}}>
                          <h3>Enrolled Courses</h3>
                          {
                            userCourseEnrollDetails && userCourseEnrollDetails.detail ?
                            <h4>No data</h4>:
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
                                                        enrolledCourses.map((number,index)=>      
                                                        
                                                        <div key={index} style={{borderRadius:'5px',padding:'5px'}}>
                                                        <div style={{backgroundImage:`url(${number['courseImage']})`,height:'10rem',borderRadius:'15px',backgroundSize:'cover',paddingTop:'4rem'}}>
                                                              <p className='text-center' style={{backgroundColor:'white',opacity:'0.8',fontSize:'20px',fontFamily:'Lora'}} >{getCourseLengthInfo(number['courseEnrolledName'])}</p>
                                                              <div style={{display:'flex',float:'right'}}>             
                                                              </div>

                                                        </div>
                                                        
                                                        </div>
                                                        )
                                                    }

                                                </Carousel>
                                            }
                        </div>   
                        <h3 id='yourCourse' style={{marginTop:'0rem'}}>Your Courses</h3>
                        <div id="myModal" style={{display:'none'}} class="modal">
                          <div class="modal-content" style={{width:'75%',display:'flex',height:'14rem'}}>
                            <div><span style={{width:'2rem'}} onClick={closeDeleteAlert} class="close">×</span>
                            </div>
                            <p className='confirmqstn'>Are u sure you want to delete ?<br/>{deleteCourseName}</p>
                            <div style={{display:'flex',justifyContent:'center'}}>
                              <button className='confirmBoxbtn' onClick={closeDeleteAlert} style={{color:'grey'}}>Cancel</button>
                              <button className='confirmBoxbtn deleteBtn' onClick={(e)=>deleteCourseFunc(deleteCourse)} style={{color:'red'}}>Delete</button>
                            </div>
                          </div>

                        </div>
                        
                        {userCourseRegisterDetail && userCourseRegisterDetail.detail ?
                              <h4>No data</h4>:
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
                                                        registeredCourse.map((number,index)=>      
                                                        
                                                        <div key={index} style={{borderRadius:'5px',padding:'5px'}}>
                                                        <div style={{backgroundImage:`url(${number['courseImage']})`,height:'10rem',borderRadius:'15px',backgroundSize:'cover',paddingTop:'4rem'}}>
                                                              <p className='text-center' style={{backgroundColor:'white',opacity:'0.8',fontSize:'20px',fontFamily:'Lora'}} >{getCourseLengthInfo(number['courseName'])}</p>
                                                              <div style={{display:'flex',float:'right'}}>
                                                                <button className='Edit' onClick={()=>editCourseData(number['courseName'],number['courseTypeName'],number['credential'])}><AiFillEdit style={{color:"#78797d"}}/></button>
                                                                <button className='Edit' onClick={(e)=>displayDeleteAlert(e,number['id'],number['courseName'])}><AiFillDelete style={{color:'#e63a3a'}}/></button>
                                                                
                                                              </div>

                                                        </div>
                                                        
                                                        </div>
                                                        )
                                                    }

                                                </Carousel>
                          }
                                                  
                                                              
                        


                                       

                        {
                          userCourseRegisterDetail && userCourseRegisterDetail.detail ?  <h3 style={{marginTop:'0rem'}}>Register New Courses</h3>
                          :     editButtonClick ?<h3 style={{marginTop:'-9rem'}}>Edit </h3> :<h3 style={{marginTop:'-9rem'}}>Register New Courses</h3>
                        }

                        {registerCourse &&
                        <div className='messageForRegisterCourse'><p style={{color:'green'}}>Registered new course</p></div>
                        }
                        {showInputNotFilled && 
                        <div className='messageForfillingCourse'><p style={{color:'red'}}>please fill all the details</p></div>
                        }
                        
                        <div>
                        
                          <div className='row' style={{paddingBottom:'3rem'}}>
                            
                              <div className='col-md-6'>
                                <label className='labels'>Username</label><br/>
                                <input className='inputTypes' name='username' type='text' value={username} readOnly /><br/>                        
                                <label className='labels'>Name of the Course</label><br/>
                              <input className='inputTypes'  type='text' value={courseName} onChange={(e)=>setCourseName(e.target.value)}/><br/>
                                <div className='d-flex positionGender' style={{}}>
                                  <div className='w-50' style={{height:'28px'}}>
                                    <label className='labels'>Course type</label>
                                      <br />

                                      <input
                                        className="inputTypes"
                                        type="text"
                                        name="courseType"
                                        id="courseType"
                                        placeholder="e.g. maths, biology, programming"
                                        value={courseType}
                                        onChange={(e) => setCourseType(e.target.value)}
                                        required
                                      />
                                      <br />

                                      <label className="labels">Course image (optional)</label>
                                      <br />

                                      <input
                                        type="file"
                                        name="courseImage"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];

                                          if (file) {
                                            setCourseImage(file);
                                            setCourseImagePreview(URL.createObjectURL(file));
                                          } else {
                                            setCourseImage(null);
                                            setCourseImagePreview("");
                                          }
                                        }}
                                      />

                                      {courseImagePreview && (
                                        <div style={{ marginTop: "10px" }}>
                                          <img
                                            src={courseImagePreview}
                                            alt="Course category preview"
                                            style={{
                                              width: "120px",
                                              height: "100px",
                                              objectFit: "cover",
                                              borderRadius: "8px",
                                            }}
                                          />
                                        </div>
                                      )}
                                  </div>

                                </div>

                              </div>
                            <div className='col-md-6'>
                            <label className='labels'>email</label><br/>
                                <input className='inputTypes' name='email' type='text' value={email} readOnly /><br/>
                              <label className='labels'>Provide Credentials (URL)</label><br/>
                              <input className='inputTypes' type='text' value={credential} onChange={(e)=>setCredential(e.target.value)} /><br/>
                              {
                                editButtonClick ?                             
                                <button className='submitButton' onClick={EditCurrentCourseData} disabled={loadingForCourseRegister}>
                                  {loadingForCourseRegister ? 'Saving...' : 'Edit'}
                                </button>
                                :                             
                                 <button className='submitButton' onClick={registeringCourse} disabled={loadingForCourseRegister}>
                                  {loadingForCourseRegister ? 'Saving...' : 'Submit'}
                                </button>

                              }
                            </div>
                            <div style={{height:'10rem',width:'10rem',backgroundColor:'red',display:'none'}} id='confirm'>
                            </div> 
                            
                          </div>
                          
                        </div>
                      </div>
                      <div id='education' value='education'>

                      </div>
                    
                      <div id='certificate' value='certificate' >


                      </div>
                      {userProfile && 
                      
                      <div id='user' className='row' style={{marginTop:'1rem'}}>
                          <div className='col-lg-4' style={{height:'auto'}}>


                              <div className='imgProfile' style={{backgroundImage:`url(${userProfile.image})`,backgroundSize:'cover'}}>

                              </div>
                              <div className='personalData'>
                                <p style={{fontSize:'25px'}}>{userProfile.email}</p>
                                <p className='student'>Student</p>
                                <p style={{marginTop:'-15px',fontFamily:'math'}}>10 th June 2000</p>
                                <p style={{fontFamily:'math',marginTop:'-16px'}}>Male</p>
                                <p style={{fontFamily:'math',marginTop:'-16px'}}>Mystic falls street , New lane , London</p>
                                <p>Contact</p>
                                <p style={{fontFamily:'math',marginTop:'-16px'}}>+91 9945679339</p>
                                <p style={{fontFamily:'math',marginTop:'-16px'}}>jeromygilbert@gmail.com</p>
                              </div>

                          </div>
                          <div className='col-lg-8' style={{height:'auto'}}>
                              <div className='rightDetails'>
                                <p className='name'>HI I'm Jeromy</p>
                                <button>Edit profile</button>
                                <p className='about'><strong>" </strong>Passionate student who like to study and buid a career with attaining lots pf skills
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                <strong> "</strong>
                                </p>
                                
                                {/* <p className='currently'>currently : <span>Pursuing Post Graducation</span></p> */}

                                <div>
                                  <p className='achievement'>Achievements</p>
                                  <div style={{display:'flex'}}>
                                    <div className='achieveLogo' style={{backgroundImage:`url(${beginerAchievement})`,backgroundSize:'cover',cursor:'pointer'}}>
                                        <div className='hiddenAchieve' >
                                          <div style={{backgroundColor:'rgb(137 219 224 / 94%)'}}>
                                            <div style={{justifyContent:'center',display:'flex',paddingTop:'10px',paddingBottom:'10px'}}>
                                              <div  style={{height:'8rem',backgroundImage:`url(${beginerAchievement})`,backgroundSize:'cover',width:'8rem',borderRadius:'5rem',border:'2px solid white'}}>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='hiddenAchieveName' style={{height:'auto',textAlign:'center',paddingRight:'23px'}}>
                                                <p>Beginner</p>
                                                <p className='hiddenAchieveStatus'>Gitty Join !</p>
                                                <p className='percent'>100 % unlocked !</p>
                                          </div>
                                        </div>
                                    </div>
                                    <div className='achieveLogo' style={{backgroundImage:`url(${secondLevelAchievement})`,backgroundSize:'cover',marginLeft:'13px'}}>
                                      <div className='hiddenAchieve' style={{marginLeft:'-4rem'}}>
                                            <div style={{backgroundColor:'rgb(12 97 114)'}}>
                                              <div style={{justifyContent:'center',display:'flex',paddingTop:'10px',paddingBottom:'10px'}}>
                                                <div  style={{height:'8rem',backgroundImage:`url(${secondLevelAchievement})`,backgroundSize:'cover',width:'8rem',borderRadius:'5rem',border:'2px solid white'}}
          >
                                                </div>
                                              </div>
                                            </div>
                                            <div className='hiddenAchieveName' style={{height:'auto',textAlign:'center',paddingRight:'23px'}}>
                                                  <p>Second Level</p>
                                                  <p className='hiddenAchieveStatus'>Gitty Run !</p>
                                                  <p className='percent'>100 % unlocked !</p>
                                            </div>
                                      </div>
                                    </div>
                                    <div className='achieveLogo' style={{backgroundImage:`url(${thirdlevel})`,backgroundSize:'cover',marginLeft:'13px'}}>
                                      <div className='hiddenAchieve' style={{marginLeft:'-8rem'}}>
                                            <div style={{backgroundColor:'rgb(209 216 217)'}}>
                                              <div style={{justifyContent:'center',display:'flex',paddingTop:'10px',paddingBottom:'10px'}}>
                                                <div  style={{height:'8rem',backgroundImage:`url(${thirdlevel})`,backgroundSize:'cover',width:'8rem',borderRadius:'5rem',border:'2px solid white'}}
          >
                                                </div>
                                              </div>
                                            </div>
                                            <div className='hiddenAchieveName' style={{height:'auto',textAlign:'center',paddingRight:'23px'}}>
                                                  <p>third Level</p>
                                                  <p className='hiddenAchieveStatus'>Gitty Plane !</p>
                                                  <p className='percent'>100 % unlocked !</p>
                                            </div>
                                      </div>
                                    </div>
                                    <div className='achieveLogo' style={{backgroundImage:`url(${fourthlevel})`,backgroundSize:'cover',marginLeft:'13px'}}>
                                      <div className='hiddenAchieve' style={{marginLeft:'-12rem'}}>
                                            <div style={{backgroundColor:'rgb(209 216 217)'}}>
                                              <div style={{justifyContent:'center',display:'flex',paddingTop:'10px',paddingBottom:'10px'}}>
                                                <div  style={{height:'8rem',backgroundImage:`url(${fourthlevel})`,backgroundSize:'cover',width:'8rem',borderRadius:'5rem',border:'2px solid white'}}
          >
                                                </div>
                                              </div>
                                            </div>
                                            <div className='hiddenAchieveName' style={{height:'auto',textAlign:'center',paddingRight:'23px'}}>
                                                  <p>fourth Level</p>
                                                  <p className='hiddenAchieveStatus'>Gitty Catch !</p>
                                                  <p className='percent'>100 % unlocked !</p>
                                            </div>
                                      </div>
                                    </div>
                                    <div className='achieveLogo' style={{backgroundImage:`url(${endlevel})`,backgroundSize:'cover',marginLeft:'13px'}}>
                                      <div className='hiddenAchieve' style={{marginLeft:'-16rem'}}>
                                            <div style={{backgroundColor:'rgb(209 216 217)'}}>
                                              <div style={{justifyContent:'center',display:'flex',paddingTop:'10px',paddingBottom:'10px'}}>
                                                <div  style={{height:'8rem',backgroundImage:`url(${endlevel})`,backgroundSize:'cover',width:'8rem',borderRadius:'5rem',border:'2px solid white'}}
          >
                                                </div>
                                              </div>
                                            </div>
                                            <div className='hiddenAchieveName' style={{height:'auto',textAlign:'center',paddingRight:'23px'}}>
                                                  <p>End Level</p>
                                                  <p className='hiddenAchieveStatus'>Gitty sleep !</p>
                                                  <p className='percent'>100 % unlocked !</p>
                                            </div>
                                      </div>
                                    </div>
                                  </div>                     
                                </div>
                                <div style={{backgroundColor:'violet',marginTop:'2rem',zIndex:'1',position:'absolute'}}>
                                        <div style={{height:'14rem'}}>
                                              <p>every man has a day</p>
                                        </div>
                                </div>
                              </div>
                              

                          </div>
                        </div>
                      
                      
                      }
                      
          </div>


        </div>

}


    </div>
  )
}

export default ProfileScreen
