import Axios from "axios";
import React, { useState,useEffect } from "react";
import { useDispatch,useSelector  } from 'react-redux'
import { useParams,useLocation,useNavigate} from 'react-router-dom'
import {Navigationbar} from '../../components/Navigation/Navigationbar'
import atm from '../../images/atm.jpg'
import background from '../../images/backGround.jpeg'
import atm2 from '../../images/atm2.png'
import atm3 from '../../images/atm3.png'
import axios from 'axios'
import './PremiumCourse.css'

import {premiumCourseEnrollAction } from '../../actions/premiumCourseActions'

function PremiumCourseScreen() {
  // const [name, setName] = useState("");
  // const [amount, setAmount] = useState("");

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin

  const premiumCourseEnrollData=useSelector(state=>state.premiumCourseEnrollData)
  const {premiumEnrolled}=premiumCourseEnrollData

  useEffect(()=>{ 
  
    if(userInfo){
        // console.log("signedIn")
        if(premiumEnrolled && premiumEnrolled.response==='true'){
          navigate("/premiumCourse/premiumCourseRegister")
        }
        // console.log(premiumEnrolled)

    }else{
        navigate("/signin")
    }      
  },[premiumEnrolled])
// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

    const showRazorpay = async (e) => {
    e?.preventDefault();

    if (!userInfo?.token) {
      navigate("/signin");
      return;
    }

    try {
      const loaded = await loadScript();

      if (!loaded || !window.Razorpay) {
        alert("Unable to load Razorpay. Please try again.");
        return;
      }

      const amount = 5;

      const formData = new FormData();
      formData.append("amount", String(amount));
      formData.append("name", userInfo.username);

      const response = await axios.post(
        "/razorpay/pay/",
        formData,
        {
          headers: {
            Authorization: `token ${userInfo.token}`,
          },
        }
      );

      const data = response.data;

      if (!data?.razorpay_key || !data?.order?.id) {
        console.error("Invalid Razorpay order response:", data);
        alert(data?.data || "Unable to create payment order.");
        return;
      }

      const options = {
        key: data.razorpay_key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Premium Course",
        description: "Premium course publishing fee",
        order_id: data.order.id,

        prefill: {
          email: userInfo.email || "",
        },

        theme: {
          color: "#3399cc",
        },

        modal: {
          ondismiss: () => {
            console.log("Razorpay checkout closed.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        alert(
          response.error?.description ||
            "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay initialization error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.detail ||
          error.response?.data?.data ||
          "Unable to start payment. Please try again."
      );
    }
  };

  return (
    <div style={{backgroundImage:`url(${background})`,backgroundSize:'cover'}}>
      <Navigationbar/>
      <div className="container" style={{ marginTop: "4rem"}}>
        <div className="row" style={{marginBottom:'3rem'}}>
          <div style={{padding:'4rem',backgroundColor:'white' }} className="col-md-6">
            <form>
            <h1 className="headPayment">Make your <span className="premiumWord">Premium </span>course Payment as fast as you can ,and bear with us</h1>
            <p className="paymentContent">For all premium course creation & sharing, pay the Rs 5 and make public your courses.<br/>
            Feel free to browse and enjoy the premium courses that suits for you.</p>
            {/* <div className="form-group">
              <label htmlFor="exampleInputPassword1">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
              />
            </div> */}
            </form>
            <button onClick={showRazorpay} className="btn btn-primary btn-block paymentBtn">
              Pay Rs 5
            </button>
          </div>

          <div className="col-md-6" style={{backgroundImage:`url(${background})`,backgroundSize:'cover'}}>
             <img className="imagePremium" src={atm2} alt="card" style={{width:'100%',height:'30rem',marginTop:'1rem'}}/>
             <img className="supportedPayments" src={atm3} alt="paymentMethods" style={{marginTop:'1rem',marginBottom:'1rem'}}/>

          </div>
        </div>
        <div style={{marginTop:'4rem',height:'3rem'}}>

        </div>
     
      </div>
    </div>
   
  );
}

export default PremiumCourseScreen;

