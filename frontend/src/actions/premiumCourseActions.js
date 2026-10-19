import axios from 'axios'

export const premiumCourseEnrollAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:'PREMIUM_ENROLLED_REQUEST'})


        const {userLogin:{userInfo},}=getState()
     
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`,
            }
        }

       
        
        const {data}=await axios.get(
            `/razorpay/isPaid/`,
            config
            )

            // console.log(data)
            dispatch({
                        type:'PREMIUM_ENROLLED_SUCCESS',
                        payload:data
                    })
    }
    catch(error){
        dispatch({
            type:'PREMIUM_ENROLLED_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}

export const premiumCourseRegisterAction = (formData) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: 'PREMIUM_COURSE_REGISTER_REQUEST' });

            const { userLogin: { userInfo } } = getState();

            const config = {
                headers: {
                    Authorization: `token ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                `/razorpay/premiumCourseRegister/`,
                formData,
                config
            );

            dispatch({
                type: 'PREMIUM_COURSE_REGISTER_SUCCESS',
                payload: data,
            });

           } catch (error) {
                console.error("Status:", error.response?.status);
                console.error("Backend response:", error.response?.data);

                dispatch({
                    type: 'PREMIUM_COURSE_REGISTER_FAIL',
                    payload: JSON.stringify(
                        error.response?.data || error.message
                    ),
                });
            }
    };

export const premiumCourseBrowseAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:'PREMIUM_COURSE_BROWSE_REQUEST'})


        const {userLogin:{userInfo},}=getState()
        // console.log(formData)
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`,
            }
        }

       
        
        const {data}=await axios.get(
            `/razorpay/premiumCourseBrowse/`,
            config
            )

            // console.log(data)
            dispatch({
                        type:'PREMIUM_COURSE_BROWSE_SUCCESS',
                        payload:data
                    })
    }
    catch(error){
        dispatch({
            type:'PREMIUM_COURSE_BROWSE_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}


export const premiumClassEnrollAction=(courseId)=>async(dispatch,getState)=>{
    try{
        dispatch({type:'PREMIUM_CLASS_ENROLL_REQUEST'})


        const {userLogin:{userInfo},}=getState()
        // console.log(formData)
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`,
            }
        }

       
        
        const {data}=await axios.post(
            `/razorpay/premiumClassEnroll/`,
            {
                'course':courseId,
            },config
            )

            dispatch({
                        type:'PREMIUM_CLASS_ENROLL_SUCCESS',
                        payload:data
                    })
            return data
    }
    catch(error){
        dispatch({
            type:'PREMIUM_CLASS_ENROLL_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
        throw error
    }
}

export const premiumCoursePaymentVerifyAction=(paymentDetails)=>async(dispatch,getState)=>{
    try{
        dispatch({type:'PREMIUM_CLASS_ENROLL_REQUEST'})

        const {userLogin:{userInfo},}=getState()
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`,
            }
        }

        const {data}=await axios.post(
            `/razorpay/premiumCoursePaymentVerify/`,
            paymentDetails,
            config
        )

        if (data.detail !== 'Enrollment complete.') {
            throw new Error(data.detail || 'Payment verification failed.')
        }

        dispatch({
            type:'PREMIUM_CLASS_ENROLL_SUCCESS',
            payload:data
        })
        return data
    } catch(error) {
        dispatch({
            type:'PREMIUM_CLASS_ENROLL_FAIL',
            payload:error.response?.data?.detail || error.message
        })
        throw error
    }
}


export const premiumClassEnrollProfileAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:'PREMIUM_CLASS_ENROLL_PROFILE_REQUEST'})


        const {userLogin:{userInfo},}=getState()
        // console.log(formData)
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`,
            }
        }

       
        
        const {data}=await axios.get(
            `/razorpay/premiumClassEnrollProfile/`,
            config
            )

            // console.log(data)
            dispatch({
                        type:'PREMIUM_CLASS_ENROLL_PROFILE_SUCCESS',
                        payload:data
                    })
    }
    catch(error){
        dispatch({
            type:'PREMIUM_CLASS_ENROLL_PROFILE_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}
