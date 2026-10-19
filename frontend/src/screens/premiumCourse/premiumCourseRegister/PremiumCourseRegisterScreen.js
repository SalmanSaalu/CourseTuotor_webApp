import React,{useState,useEffect} from 'react'
import './PremiumCourseRegisterScreen.css'
import {Navigationbar} from '../../../components/Navigation/Navigationbar'
import {FaRegistered  } from 'react-icons/fa6'
import {BsBrowserEdge  } from 'react-icons/bs'
import {AiFillProfile } from 'react-icons/ai'
import { useSelector,useDispatch } from 'react-redux'
import { premiumCourseRegisterAction } from '../../../actions/premiumCourseActions'
import PremiumCourseBrowseScreen  from '../premiumCourseBrowse/PremiumCourseBrowseScreen'
import PremiumCourseProfileScreen from '../premiumCourseProfile/PremiumCourseProfileScreen'
import { useParams,useLocation,useNavigate} from 'react-router-dom'
import TeacherEnrolledStudents from '../teacherEnroll/TeacherEnrolledStudents';

function PremiumCourseRegisterScreen() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userLogin=useSelector(state=>state.userLogin)
  const {error,userInfo}=userLogin

  const [registerPage,setRegisterPage]=useState(true)
  const [browsePage,setBrowsePage]=useState(false)
  const [yourPage,setYourPage]=useState(false)


  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [dob,setDob]=useState("")
  const [phone,setPhone]=useState("")
  const [adhaar,setAdhaar]=useState("")
  const [qualification,setQualification]=useState("")
  const [about,setAbout]=useState("")
  const [linkedIn,setLinkedin]=useState("")

  const [coursename,setCoursename]=useState("")
  const [coursetype,setCourseType]=useState("")
  const [coursedays,setCoursedays]=useState([])
  const [coursetime,setCoursetime]=useState("")
  const [trainingexp,setTrainingexp]=useState("")
  const [amount,setAmount]=useState("")

  const [errorMessages,setErrormessages]=useState(false)
  const [confirmRegisteration,setConfirmRegisteration]=useState(false)

  const [courseImage, setCourseImage] = useState(null);
  const premiumCourseRegisterData=useSelector(state=>state.premiumCourseRegisterData)
  const {loading,premiumRegister}=premiumCourseRegisterData
  const [studentsPage, setStudentsPage] = useState(false);

  useEffect(()=>{
    if(userInfo){
      setUserName(userInfo.username)
      setEmail(userInfo.email)
      if(premiumRegister){
        
        setDob("")
        setAbout("")
        setAdhaar("")
        setQualification("")
        setPhone("")
        setLinkedin("")
        setCoursename("")
        setCoursedays([])
        setCoursetime("")
        setTrainingexp("")
        setAmount("")
        setCourseType("")
        setConfirmRegisteration(true)
      }
    }else{
      navigate("/")
    }
  },[registerPage,browsePage,yourPage,premiumRegister])

  const optionBtnHandler=(e,btn)=>{
    e.preventDefault()
    if(btn==='firstBtn'){
      setRegisterPage(true)
      setBrowsePage(false)
      setYourPage(false)
      // first
      document.getElementById(btn).style.backgroundColor="#03a7ff"
      document.getElementById(btn).style.border="3px solid #1a6bfe"
      // second
      document.getElementById("secondBtn").style.backgroundColor="#ffa703"
      document.getElementById("secondBtn").style.border="3px solid #ff9707"
      // third
      document.getElementById("thirdBtn").style.backgroundColor="#ffa703"
      document.getElementById("thirdBtn").style.border="3px solid #ff9707"
    }
    else if(btn==='secondBtn'){
      setRegisterPage(false)
      setBrowsePage(true)
      setYourPage(false)
      // first
      document.getElementById("firstBtn").style.backgroundColor="#ffa703"
      document.getElementById("firstBtn").style.border="3px solid #ff9707"
      // second
      document.getElementById("secondBtn").style.backgroundColor="#03a7ff"
      document.getElementById("secondBtn").style.border="3px solid #1a6bfe"
      // third
      document.getElementById("thirdBtn").style.backgroundColor="#ffa703"
      document.getElementById("thirdBtn").style.border="3px solid #ff9707"
    }
    else if(btn==='thirdBtn'){
      setRegisterPage(false)
      setBrowsePage(false)
      setYourPage(true)
      // first
      document.getElementById("firstBtn").style.backgroundColor="#ffa703"
      document.getElementById("firstBtn").style.border="3px solid #ff9707"
      // second
      document.getElementById("secondBtn").style.backgroundColor="#ffa703"
      document.getElementById("secondBtn").style.border="3px solid #ff9707"
      // third
      document.getElementById("thirdBtn").style.backgroundColor="#03a7ff"
      document.getElementById("thirdBtn").style.border="3px solid #1a6bfe" 
    }
    else if (btn === 'fourthBtn') {
    setRegisterPage(false);
    setBrowsePage(false);
    setYourPage(false);
    setStudentsPage(true);

    ['firstBtn', 'secondBtn', 'thirdBtn'].forEach(id => {
        document.getElementById(id).style.backgroundColor = '#ffa703';
        document.getElementById(id).style.border = '3px solid #ff9707';
    });

    document.getElementById('fourthBtn').style.backgroundColor = '#03a7ff';
    document.getElementById('fourthBtn').style.border = '3px solid #1a6bfe';
}
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    // console.log(phone,adhaar,dob,linkedIn,qualification,coursename,coursetime,amount)
    if (
        phone &&
        adhaar &&
        dob &&
        linkedIn &&
        qualification &&
        coursename &&
        coursetype.trim() &&
        coursetime &&
        amount
      ) {
      // console.log('inside')
      setErrormessages(false)
      const coursetypeAdded = coursetype.trim();

      if (!coursetypeAdded) {
        setErrormessages(true);
        return;
      }
      var teachingAdded=document.getElementById('teaching').value
      setTrainingexp(teachingAdded)
      var markedDays=document.getElementsByName("days")
      
      var arr2=[]
      // console.log('inside')
      setCoursedays([])
      for (var checkbox of markedDays) { 
         
        if (checkbox.checked)  
          {
            arr2.push(checkbox.value)  
        }
         }  
          setCoursedays(coursedays.concat(arr2))  
          const formData = new FormData();
          formData.append("username", username);
          formData.append("email", email);
          formData.append("phone", phone);
          formData.append("adhaar", adhaar);
          formData.append("dob", dob);
          formData.append("about", about);
          formData.append("linkedin", linkedIn);
          formData.append("qualification", qualification);
          formData.append("coursetype", coursetype.trim());
          formData.append("coursename", coursename);
          formData.append("coursedays", arr2.join(","));
          formData.append("coursetime", coursetime);
          formData.append(
            "teachingexp",
            document.getElementById("teaching").value
          );
          formData.append("amount", amount);

          if (courseImage) {
            formData.append("courseImage", courseImage);
          }

          dispatch(premiumCourseRegisterAction(formData)); 
    }else{
        setConfirmRegisteration(false)
        setErrormessages(true)
    }
    


  }


  return (
    <div>
      <Navigationbar/>
      <div className='' style={{display:'flex',justifyContent:'center',backgroundColor:'#f0f0f0'}}>
        <div className='optionDiv'>
        <button id='firstBtn' onClick={(e)=>optionBtnHandler(e,"firstBtn")} className='optionButton'><FaRegistered/></button>
       
        </div>

        <div className='optionDiv'>
        <button id='secondBtn' onClick={(e)=>optionBtnHandler(e,"secondBtn")} className='optionButton' ><BsBrowserEdge/></button>
        
        </div>

        <div className='optionDiv'>
        <button id='thirdBtn' onClick={(e)=>optionBtnHandler(e,"thirdBtn")} className='optionButton' ><AiFillProfile/></button>
        
        </div>
        <div className="optionDiv">
            <button
                id="fourthBtn"
                onClick={(e) => optionBtnHandler(e, 'fourthBtn')}
                className="optionButton"
                title="Enrolled Students"
            >
                Students
            </button>
        </div>
      </div>
      <div>

        {registerPage &&
            <div className='container'>
                <h3 className='headForRegister'>Register Premium Courses</h3>

                <hr style={{border:'2px solid #0ba9f2',opacity:"1"}}/>
                  {
                    confirmRegisteration && <p className='confirmMessage'>registeration successful</p>
                  }
                <h5 style={{fontFamily:'Poltawski Nowy',marginLeft:'3rem',marginTop:'3rem'}}>PERSONAL DETAILS</h5>
                <div className='row' style={{backgroundColor:"#f3f3f3",paddingBottom:'2rem'}}>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Name</label><br/>
                      <input className='inputRegister'  type='text' name='name' value={username} readOnly/><br/>

                      <label className='labelRegister' for='name'>Email</label><br/>
                      <input className='inputRegister' type='email' name='email' value={email} readOnly/><br/>
                  </div>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Phone number</label><br/>
                      <input className='inputRegister' type='number' name='phone' onChange={(e)=>setPhone(e.target.value)} value={phone}/><br/>

                      <label className='labelRegister' for='name'>Adhaar Number</label><br/>
                      <input className='inputRegister' type='number' name='adhaar' onChange={(e)=>setAdhaar(e.target.value)} value={adhaar}/><br/>
                  </div>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Date Of Birth</label><br/>
                      <input className='inputRegister' type='date' name='DOB' onChange={(e)=>setDob(e.target.value)} value={dob}/><br/>

                      <label className='labelRegister' for='name'>About</label><br/>
                      <input className='inputRegister' type='text' name='about' onChange={(e)=>setAbout(e.target.value)} value={about}/><br/>
                  </div>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Linked In</label><br/>
                      <input className='inputRegister' type='text' name='linkedin' onChange={(e)=>setLinkedin(e.target.value)} value={linkedIn}/><br/>

                      <label className='labelRegister' for='name'>Qualification</label><br/>
                      <input className='inputRegister' type='text' name='qualification' onChange={(e)=>setQualification(e.target.value)} value={qualification}/><br/>
                  </div>
                </div>
                <h5 style={{fontFamily:'Poltawski Nowy',marginLeft:'3rem',marginTop:'3rem'}}>COURSE DETAILS</h5>
                <div className='row' style={{backgroundColor:"#f3f3f3",paddingBottom:'1rem'}}>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Course Name</label><br/>
                      <input className='inputRegister'  type='text' name='coursename' value={coursename} onChange={(e)=>setCoursename(e.target.value)}/><br/>


                      <label className="labelRegister" htmlFor="coursetype">
                        Course Type
                      </label>
                      <br />
                      <input
                        className="inputRegister"
                        type="text"
                        name="coursetype"
                        id="coursetype"
                        value={coursetype}
                        onChange={(e) => setCourseType(e.target.value)}
                        placeholder="Enter course type (e.g. Biology)"
                        required
                      />
                      <br />
                      <label className="labelRegister" htmlFor="courseImage">
                        Premium course image (optional)
                      </label>
                      <br />

                      <input
                        className="inputRegister"
                        type="file"
                        id="courseImage"
                        name="courseImage"
                        accept="image/*"
                        onChange={(e) =>
                          setCourseImage(e.target.files[0] || null)
                        }
                      />
                      <br />

                  </div>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Course Time</label><br/>
                      <input className='time'  type='time' name='coursetime' style={{width:'8rem'}} onChange={(e)=>setCoursetime(e.target.value)} value={coursetime} /> 

                      <br/><label className='labelRegister' for='name'>Course Days</label><br/>
                            <input type="checkbox" id="monday" className='days' name="days" value="monday"/>
                            <label for="monday" style={{paddingLeft:'5px',fontFamily:'Lora'}}>Monday</label>

                            <input type="checkbox" id="tuesday" className='days' name="days" value="tuesday"/>
                            <label for="tuesday"  style={{paddingLeft:'5px',fontFamily:'Lora'}}>Tuesday</label>

                            <input type="checkbox" id="wednesday" className='days' name="days" value="wednesday"/>
                            <label for="wednesday"  style={{paddingLeft:'5px',fontFamily:'Lora'}}y>Wednesday</label>     

                            <input type="checkbox" id="thursday" className='days' name="days" value="thursday"/>
                            <label for="thursday"  style={{paddingLeft:'5px',fontFamily:'Lora'}}>Thursday</label> <br/>

                            <input type="checkbox" id="friday" className='days' name="days" value="friday"/>
                            <label for="friday" style={{paddingLeft:'5px',fontFamily:'Lora'}}>Friday</label> 

                            <input type="checkbox" id="saturday" className='days' name="days" value="saturday"/>
                            <label for="saturday"  style={{paddingLeft:'5px',fontFamily:'Lora'}}>Saturday</label> 

                            <input type="checkbox" id="sunday" className='days' name="days" value="sunday"/>
                            <label for="sunday" style={{paddingLeft:'5px',fontFamily:'Lora'}}>Sunday</label>                  
                  </div>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Teaching experience</label><br/>
                      <select name="teaching" id="teaching" className='inputRegister'>
                        <option>-select-</option>
                        <option value="1">less than 1 year</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                        <option value="4">4 years</option>
                        <option value="5">more than 4 years</option>
                      </select>
                  </div>
                  <div className='col-md-6' style={{paddingLeft:'4rem'}}>
                      <label className='labelRegister' for='name'>Payment Amount</label><br/>
                      <input className='inputRegister' type='number' onChange={(e)=>setAmount(e.target.value)} value={amount} name='paymentamount'/><br/>
                  </div>
                  {
                    errorMessages &&  <p className='errorMessage'>please fill all the details and then submit</p>
                  }

                  

                </div>

                <button onClick={(e)=>submitHandler(e)} className='submit'>Submit</button>
            </div>
        }

        {browsePage &&
            <div>
                <PremiumCourseBrowseScreen/>
            </div>
        }
   

        {yourPage &&
            <div>
                <PremiumCourseProfileScreen/>
            </div>       
        }


        {studentsPage && <TeacherEnrolledStudents />}

      </div>
    </div>
  )
}

export default PremiumCourseRegisterScreen
