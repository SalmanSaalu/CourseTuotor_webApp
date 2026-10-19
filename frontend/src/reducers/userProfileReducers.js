export const userProfileDetailsReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_PROFILE_DETAILS_REQUEST':
            return {loading:true}

        case 'USER_PROFILE_DETAILS_SUCCESS':
            return {loading:false,userProfile:action.payload}

        case 'USER_PROFILE_DETAILS_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}