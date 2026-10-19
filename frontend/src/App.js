// import {HomeScreen} from './screens/HomeScreen'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import React, { Suspense } from "react";
import Loader  from './components/Loader/Loader'
import SignupScreen from './screens/Signup/SignupScreen'
import SigninScreen from './screens/Signin/SigninScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import BrowseCategScreen from './screens/browseCategory/BrowseCategScreen'
import BrowsePopular from './screens/browsePopular/BrowsePopular'
import PremiumCourseScreen from './screens/premiumCourse/PremiumCourseScreen'
import PremiumCourseRegisterScreen from './screens/premiumCourse/premiumCourseRegister/PremiumCourseRegisterScreen'
import Chat from './screens/chat/Chat'
function App() {
  const Home=React.lazy(()=>import('./screens/HomeScreen') )

  return (
    <Suspense  maxDuration={300}  fallback={<Loader/>}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/signup' element={<SignupScreen/>}/>
        <Route path='/signin' element={<SigninScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
        <Route path='/browseCategory/:id' element={<BrowseCategScreen/>}/>
        <Route path='/browsePopular' element={<BrowsePopular/>}/>
        <Route path='/premiumCourse' element={<PremiumCourseScreen/>}/>
        <Route path='/premiumCourse/premiumCourseRegister' element={<PremiumCourseRegisterScreen/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
    </Suspense>


  );
}

export default App;
