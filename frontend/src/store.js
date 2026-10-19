import { createStore,combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducers,userRegisterReducers } from './reducers/userReducers'
import {  userProfileDetailsReducers} from './reducers/userProfileReducers'
import { userCourseRegisterReducers,userCourseRegisterDetailReducers,userBrowseCourseReducers,userCourseEnrollReducers,userCourseEnrollDetailsReducers } from './reducers/userCourseReducers'
import { PremiumCourseEnrollReducers,PremiumCourseRegisterReducers,PremiumCourseBrowseReducers,PremiumClassEnrollReducers,AllPremiumClassEnrollProfileReducers } from './reducers/PremiumCourseReducers'
import { ChatRoomReducers } from './reducers/ChatReducers'
const reducer=combineReducers({
    userLogin:userLoginReducers,
    userRegisterData:userRegisterReducers,
    userProfileData:userProfileDetailsReducers,
    userCourseRegisterData:userCourseRegisterReducers,
    userCourseRegisterDetailData:userCourseRegisterDetailReducers,
    userBrowseCourseData:userBrowseCourseReducers,
    userCourseEnrollData:userCourseEnrollReducers,
    userCourseEnrollDetailsData:userCourseEnrollDetailsReducers,
    premiumCourseEnrollData:PremiumCourseEnrollReducers,
    premiumCourseRegisterData:PremiumCourseRegisterReducers,
    premiumCourseBrowseData:PremiumCourseBrowseReducers,
    premiumClassEnrollData:PremiumClassEnrollReducers,
    premiumClassEnrollProfileData:AllPremiumClassEnrollProfileReducers,
    chatRoomData:ChatRoomReducers
})


const userInfoFromStorage=localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null


const initialState={
    userLogin:{userInfo:userInfoFromStorage},
}

const middleware=[thunk]

const store=createStore(reducer,initialState,
        composeWithDevTools(applyMiddleware(...middleware)))

export default store