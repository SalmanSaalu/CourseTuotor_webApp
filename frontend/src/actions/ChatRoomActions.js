import axios from 'axios'
export const ChatRoomAction=(teachername)=>async(dispatch,getState)=>{
    try{
        dispatch({type:'CHAT_ROOM_REQUEST'})


        const {userLogin:{userInfo},}=getState()
        // console.log(formData)
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`,
            }
        }

       
        
        const {data}=await axios.post(
            `/chat/roomCreate/`,{'teachername':teachername},
            config
            )

            // console.log(data)
            dispatch({
                        type:'CHAT_ROOM_SUCCESS',
                        payload:data
                    })
    }
    catch(error){
        dispatch({
            type:'CHAT_ROOM_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}
