export const userCourseRegisterReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_COURSE_REGISTER_REQUEST':
            return {loadingForCourseRegister:true}

        case 'USER_COURSE_REGISTER_SUCCESS':
            return {loadingForCourseRegister:false,userCourseRegister:action.payload}

        case 'USER_COURSE_REGISTER_FAIL':
            return {loadingForCourseRegister:false,error:action.payload}

        default:
            return state
    }
}

export const userCourseRegisterDetailReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_COURSE_REGISTER_DETAIL_REQUEST':
            return {loading:true}

        case 'USER_COURSE_REGISTER_DETAIL_SUCCESS':
            return {loading:false,userCourseRegisterDetail:action.payload}

        case 'USER_COURSE_REGISTER_DETAIL_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const userBrowseCourseReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_BROWSE_COURSE_REQUEST':
            return {loading:true}

        case 'USER_BROWSE_COURSE_SUCCESS':
            return {loading:false,userBrowseCourse:action.payload}

        case 'USER_BROWSE_COURSE_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const userCourseEnrollReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_ENROLL_COURSE_REQUEST':
            return {loading:true}

        case 'USER_ENROLL_COURSE_SUCCESS':
            return {loading:false,userCourseEnroll:action.payload}

        case 'USER_ENROLL_COURSE_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

export const userCourseEnrollDetailsReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_ENROLL_COURSE_DETAILS_REQUEST':
            return {loading:true}

        case 'USER_ENROLL_COURSE_DETAILS_SUCCESS':
            return {loading:false,userCourseEnrollDetails:action.payload}

        case 'USER_ENROLL_COURSE_DETAILS_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

