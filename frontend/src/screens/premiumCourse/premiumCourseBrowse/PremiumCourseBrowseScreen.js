import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import './PremiumCourseBrowseScreen.css'
import { useParams,useLocation,useNavigate} from 'react-router-dom'
import {
    premiumCourseBrowseAction,
    premiumClassEnrollAction,
    premiumCoursePaymentVerifyAction,
} from '../../../actions/premiumCourseActions'

const loadRazorpay = () => new Promise((resolve, reject) => {
    if (window.Razorpay) {
        resolve(true)
        return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Could not load the payment service.'))
    document.body.appendChild(script)
})

function PremiumCourseBrowseScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [enrollingCourse, setEnrollingCourse] = useState(null)
    const [enrollmentError, setEnrollmentError] = useState('')

    const userLogin=useSelector(state=>state.userLogin)
    const {error,userInfo}=userLogin

    const premiumCourseBrowseData=useSelector(state=>state.premiumCourseBrowseData)
    const {premiumBrowse}=premiumCourseBrowseData

    useEffect(()=>{
        if(userInfo){
            if(!premiumBrowse){
                dispatch(premiumCourseBrowseAction())
            }
        }else{
            navigate("/")
        }
    },[userInfo,premiumBrowse,dispatch,navigate])

    const getCourseLengthInfo=(name)=>{
        if (name.length > 24){
            name = name.substring(0,24)+'...';
            return name
        }
        else{
            return name
        }
    }

    
    const submitHandler = async (e, courseId) => {
        e.preventDefault();

        setEnrollingCourse(courseId);
        setEnrollmentError('');

        try {
            const loaded = await loadRazorpay();

            if (!loaded || !window.Razorpay) {
                throw new Error('Could not load Razorpay.');
            }

            // Create an order using the actual registered course amount.
            const paymentOrder = await dispatch(
                premiumClassEnrollAction(courseId)
            );

            if (
                !paymentOrder?.razorpay_key ||
                !paymentOrder?.order?.id
            ) {
                throw new Error('Could not create Razorpay order.');
            }

            await new Promise((resolve, reject) => {
                const checkout = new window.Razorpay({
                    key: paymentOrder.razorpay_key,
                    amount: paymentOrder.order.amount,
                    currency: paymentOrder.order.currency,
                    name: 'BeginTheToutor',
                    description: paymentOrder.course_name,
                    order_id: paymentOrder.order.id,

                    prefill: {
                        name: userInfo.username || '',
                        email: userInfo.email || '',
                    },

                    handler: async (response) => {
                        try {
                            // Verify the payment on the Django backend.
                            await dispatch(
                                premiumCoursePaymentVerifyAction(response)
                            );

                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    },

                    modal: {
                        ondismiss: () => {
                            reject(new Error('Payment was cancelled.'));
                        },
                    },

                    theme: {
                        color: '#3399cc',
                    },
                });

                checkout.on('payment.failed', (response) => {
                    reject(
                        new Error(
                            response.error?.description ||
                            'Payment failed. Please try again.'
                        )
                    );
                });

                checkout.open();
            });

            // Refresh course data after verified payment.
            await dispatch(premiumCourseBrowseAction());

        } catch (error) {
            console.error(
                'Course payment error:',
                error.response?.data || error
            );

            setEnrollmentError(
                error.response?.data?.detail ||
                error.message ||
                'Could not complete enrollment. Please try again.'
            );
        } finally {
            setEnrollingCourse(null);
        }
    };


  return (
    <div className='container'>
        <h3 className='headForRegister'>Browse Premium Courses</h3>
        <hr style={{border:'2px solid #0ba9f2',opacity:"1"}}/>
        {enrollmentError && <p role="alert" className="text-danger">{enrollmentError}</p>}
        <div className='row' style={{display:'flex',justifyContent:'center',marginTop:'3rem'}}>
           {premiumBrowse &&
            premiumBrowse.map((number,index)=>
                <div key={index} style={{marginTop:'1rem',marginBottom:'1rem'}}>
                    <div  className='row'  style={{boxShadow:'0px 0px 5px -1px grey',height:'auto'}}>
                        <div  className='col-md-4' style={{padding:'1rem'}}>
                            <p>
                            <span className='coursename'> {getCourseLengthInfo(number['coursename'])}</span><br/>
                            <span className='coursetype'>{number['coursetypename']}</span><br/>
                            <span className='others'>{number['email']}</span><br/>
                            <span className='others'>{number['coursedays']}</span><br/>
                            <span className='others'>{number['coursetime']}</span><br/>
                            <span className='others'>students enrolled</span><br/>
                            <span className='others'>Amount ₹{number['amount']}</span><br/>
                            </p>
                        </div>
                        <div  className='col-md-4 secondSmallDiv' style={{padding:'1rem',paddingTop:'5rem'}}>
                            <p>
                            <span className='others'>{number['dob']}</span><br/>     
                            <span className='others'>{number['qualification']}</span><br/>
                            <span className='others'>{number['about']}</span><br/>
                            <span className='others'>{number['linkedin']}</span><br/>
                            {
                                userInfo.id!==number['username'] ?

                                number['isPaid'] ? <p className='alreadyEnrolled'>Already enrolled</p>:
                                <button
                                    onClick={(e)=>submitHandler(e,number['id'])}
                                    className='enrollClass'
                                    disabled={enrollingCourse === number['id']}
                                >
                                    {enrollingCourse === number['id'] ? 'Processing...' : `Pay ₹${number['amount']} & Enroll`}
                                </button>:<p className='AddedByyou'>Added by you</p>
                            }
                            
                            
                            </p>
                        </div>
                        <div className='col-md-4'>
                        <img src={number['courseimage']} style={{width:'100%',backgroundSize:'cover',height:'auto'}}></img>
                        </div>
                    </div>

                 
                </div>
                
             
            )}
            
        </div>

    </div>
  )
}

export default PremiumCourseBrowseScreen
