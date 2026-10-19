import axios from 'axios'

export const userProfileDetailsActions=(id,formData)=>async (dispatch,getState)=>{
    try{
        dispatch({type:'USER_PROFILE_DETAILS_REQUEST'})

        
        const {userLogin:{userInfo},}=getState()


        const config={
            headers:{
                'Content-type':'multipart/form-data',
                Authorization:`token ${userInfo.token}`
            }
        }



        if(id && formData){

           
            const {data}=await axios.post(
                '/accounts/profileDetails/',
                formData,
                config
                )

            dispatch({
                    type:'USER_PROFILE_DETAILS_SUCCESS',
                    payload:data
                })
        }
        else if(id){
           
            const {data}=await axios.get(
                '/accounts/profileDetails/',
                config
                )
            
            
            dispatch({
                type:'USER_PROFILE_DETAILS_SUCCESS',
                payload:data
            })
        }


        

    }catch(error){
        dispatch({
            type:'USER_PROFILE_DETAILS_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}


