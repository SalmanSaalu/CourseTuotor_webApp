export const PremiumCourseEnrollReducers=(state={},action)=>{
    switch(action.type){
        case 'PREMIUM_ENROLLED_REQUEST':
            return {loading:true}

        case 'PREMIUM_ENROLLED_SUCCESS':
            return {loading:false,premiumEnrolled:action.payload}

        case 'PREMIUM_ENROLLED_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const PremiumCourseRegisterReducers=(state={},action)=>{
    switch(action.type){
        case 'PREMIUM_COURSE_REGISTER_REQUEST':
            return {loading:true}

        case 'PREMIUM_COURSE_REGISTER_SUCCESS':
            return {loading:false,premiumRegister:action.payload}

        case 'PREMIUM_COURSE_REGISTER_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}


export const PremiumCourseBrowseReducers=(state={},action)=>{
    switch(action.type){
        case 'PREMIUM_COURSE_BROWSE_REQUEST':
            return {loading:true}

        case 'PREMIUM_COURSE_BROWSE_SUCCESS':
            return {loading:false,premiumBrowse:action.payload}

        case 'PREMIUM_COURSE_BROWSE_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const PremiumClassEnrollReducers=(state={},action)=>{
    switch(action.type){
        case 'PREMIUM_CLASS_ENROLL_REQUEST':
            return {loading:true}

        case 'PREMIUM_CLASS_ENROLL_SUCCESS':
            return {loading:false,premiumClass:action.payload}

        case 'PREMIUM_CLASS_ENROLL_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const AllPremiumClassEnrollProfileReducers=(state={},action)=>{
    switch(action.type){
        case 'PREMIUM_CLASS_ENROLL_PROFILE_REQUEST':
            return {loading:true}

        case 'PREMIUM_CLASS_ENROLL_PROFILE_SUCCESS':
            return {loading:false,premiumClassProfile:action.payload}

        case 'PREMIUM_CLASS_ENROLL_PROFILE_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}