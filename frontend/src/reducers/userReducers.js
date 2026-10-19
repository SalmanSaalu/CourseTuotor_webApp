export const userLoginReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_LOGIN_REQUEST':
            return {loading:true}

        case 'USER_LOGIN_SUCCESS':
            return {loading:false,userInfo:action.payload}

        case 'USER_LOGIN_FAIL':
            return {loading:false,error:action.payload}

        case 'USER_LOGOUT':
            return {}
        default:
            return state
    }
}


export const userRegisterReducers=(state={},action)=>{
    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return {loading:true}

        case 'USER_REGISTER_SUCCESS':
            return {loading:false,userRegister:action.payload}

        case 'USER_REGISTE_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}

