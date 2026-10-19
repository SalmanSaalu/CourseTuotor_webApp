import React,{useState,useEffect} from 'react'
import { MdEmail } from 'react-icons/md'
import { AiFillLock } from 'react-icons/ai'
import './SigninScreen.css'
import signin from '../../images/signin.jpg'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { userLoginActions } from '../../actions/userActions'
function SigninScreen() {

    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [emailEmpty,setEmailEmpty]=useState(true)
    const [passwordEmpty,setPasswordEmpty]=useState(true)
    const userLogin=useSelector(state=>state.userLogin)
    const {error,loading,userInfo}=userLogin
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const redirect='/'
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo])

    const Visiblepassword = document.querySelector('#id_password');
    const visibleEye =()=>{
        
        if(password !==''){
            if(Visiblepassword.type==='password'){
                Visiblepassword.type='text'
                document.getElementById('togglePassword').className='far fa-eye';
            }
            else if(Visiblepassword.type==='text'){
                Visiblepassword.type='password'
                document.getElementById('togglePassword').className='far fa-eye-slash';
            }
        }

    }

    const submitHandler=(e)=>{
        e.preventDefault()
        if(email !==''){
            setEmailEmpty(true)
        }
        if(password!==''){
            setPasswordEmpty(true)
        }
        if(email !=='' && password !==''){
            dispatch(userLoginActions(email,password))

        }
        else{
            if(email===''){
                setEmailEmpty(false)
            }
            if(password===''){
                setPasswordEmpty(false)
            }
        }
    }
   

  return (
    <div style={{backgroundColor:'#f3f1f1'}}>
        <div className='container' style={{ padding: '3rem',backgroundColor:'#f3f1f1'}}>
            <div className='row ' style={{paddingTop:'4rem',paddingBottom:'4rem'}}>
                <div className='col-lg-6' style={{backgroundColor:'white'}}>
                    <form>
                        <div style={{marginLeft:'2rem',marginTop:'2rem'}}>
                            <p style={{fontFamily:'Poltawski Nowy',fontSize:'26px'}}>Join over 10 million students<br/> around the globe.</p>
                            <p style={{fontSize:'13px',color:'grey'}}>Let's get signedin by filling out information below</p>

                            <p style={{fontSize:'13px',fontFamily:'Poltawski Nowy',marginTop:'1rem'}}>Email</p>
                            <MdEmail/>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} required style={{marginTop:'-4px',borderRadius:'0px 10px 10px 0px',width:'70%',border:'0px',boxShadow:'0px 0px 5px 0px grey',marginLeft:'10px',fontFamily:"Poltawski Nowy",fontSize:'15px',paddingLeft:'5px'}} type='email' />
                            {emailEmpty===false && <p className='emptyMessage'>* please fill the email</p> }


                            <p style={{fontSize:'13px',fontFamily:'Poltawski Nowy',marginTop:'1rem'}}>Password</p>
                            <AiFillLock/>
                            <input value={password} required onChange={(e)=>setPassword(e.target.value)} id='id_password' style={{marginTop:'-4px',borderRadius:'0px 10px 10px 0px',width:'50%',border:'0px',boxShadow:'0px 0px 5px 0px grey',marginLeft:'10px',fontFamily:'Poltawski Nowy',fontSize:'15px',paddingLeft:'5px'}} type='password' />
                            <i style={{marginLeft:'-29px',cursor:'pointer'}} onClick={visibleEye} class="far fa-eye-slash" id="togglePassword"></i>
                            {passwordEmpty===false && <p className='emptyMessage'>* please fill the password</p> }

                            

                            

                            <button className='buttons' onClick={submitHandler}>Proceed</button>
                            {error && <p className='error'>{error}</p>}

                            
                            <p style={{fontSize:'13px',marginTop:'18px'}}>Create new account <Link to='/signup' style={{textDecoration:'none'}}><span style={{cursor:'pointer',color:'blue'}}>Signup </span></Link></p>
                        </div>
                    </form>
                </div>
                <div className='col-lg-6' style={{backgroundColor:'white'}}>
                    <div style={{backgroundImage:`url(${signin})`,backgroundSize:'cover',boxShadow:'inset 0px 1000px rgb(28 44 193 / 30%)'}} className='img'>
                        <p className='rightText'>Use our,<br/>Mobile App <br/>For More Features</p>
                        <p style={{color:'white',paddingLeft:'4rem',marginTop:'-70px'}}>Make it happen ! Bring Your Vision to Life,<br/>Build amazing things with us.</p>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default SigninScreen
