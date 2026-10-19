import axios from 'axios'


export const userRegisterActions = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_REGISTER_REQUEST' });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Use the backend's actual port.
        // Change 8000 to 8001 if Django is running on port 8001.
        const { data } = await axios.post(
            'http://127.0.0.1:8000/accounts/register/',
            {
                email: email,
                password: password,
            },
            config
        );

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data,
        });

    } catch (error) {
        const errorMessage =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            error.message ||
            'Registration failed. Please try again.';

        console.error('Registration error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });

        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: errorMessage,
        });
    }
};


export const userLoginActions=(email,password)=>async (dispatch)=>{
    try{
        dispatch({type:'USER_LOGIN_REQUEST'})

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data}=await axios.post(
            '/accounts/login/',
            {'email':email,'password':password},
            config
            )
        
        console.log(data)
        dispatch({
            type:'USER_LOGIN_SUCCESS',
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(error){
        dispatch({
            type:'USER_LOGIN_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}

export const logout=(dispatch)=>{
   
    localStorage.removeItem('userInfo')
    dispatch({type:'USER_LOGOUT'})
}


