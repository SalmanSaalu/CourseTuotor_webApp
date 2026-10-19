import axios from 'axios'

export const userCourseEnrollDetailsActions=()=>async (dispatch,getState)=>{
    try{
        dispatch({type:'USER_ENROLL_COURSE_DETAILS_REQUEST'})

        
        const {userLogin:{userInfo},}=getState()


        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`
            }
        }

        const {data}=await axios.get(
            '/courses/enrollCourse/',
            config
            )
        
        

        dispatch({
            type:'USER_ENROLL_COURSE_DETAILS_SUCCESS',
            payload:data
        })



    }catch(error){
        dispatch({
            type:'USER_ENROLL_COURSE_DETAILS_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}




export const userCourseEnrollActions=(courseName)=>async (dispatch,getState)=>{
    try{
        dispatch({type:'USER_ENROLL_COURSE_REQUEST'})

           
        const {userLogin:{userInfo},}=getState()


        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`
            }
        }

        const {data}=await axios.post(
            '/courses/enrollCourse/', {'courseName':courseName}, 
            config
            )
        
        

        dispatch({
            type:'USER_ENROLL_COURSE_SUCCESS',
            payload:data
        })



    }catch(error){
        dispatch({
            type:'USER_ENROLL_COURSE_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}





export const userCourseRegisterActions =
  (courseName, credential, courseType, editId, courseImage = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'USER_COURSE_REGISTER_REQUEST' });

      const { userLogin: { userInfo } } = getState();

      if (!userInfo?.token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const config = {
        headers: {
          Authorization: `token ${userInfo.token}`,
        },
      };

      let response;

      if (editId && !String(editId).trim()) {
        throw new Error('Invalid course identifier.');
      }

      if (editId) {
        // UPDATE existing course
        if (courseImage) {
          const formData = new FormData();

          formData.append('courseName', courseName);
          formData.append('credential', credential);
          formData.append('courseType', courseType);
          formData.append('id', userInfo.id);
          formData.append('originalName', editId);
          formData.append('courseImage', courseImage);

          response = await axios.put(
            '/courses/courseRegister/',
            formData,
            config
          );
        } else {
          response = await axios.put(
            '/courses/courseRegister/',
            {
              courseName,
              credential,
              courseType,
              id: userInfo.id,
              originalName: editId,
            },
            {
              ...config,
              headers: {
                ...config.headers,
                'Content-Type': 'application/json',
              },
            }
          );
        }
      } else {
        // CREATE new course
        if (courseImage) {
          const formData = new FormData();

          formData.append('courseName', courseName);
          formData.append('credential', credential);
          formData.append('courseType', courseType);
          formData.append('id', userInfo.id);
          formData.append('courseImage', courseImage);

          response = await axios.post(
            '/courses/courseRegister/',
            formData,
            config
          );
        } else {
          response = await axios.post(
            '/courses/courseRegister/',
            {
              courseName,
              credential,
              courseType,
              id: userInfo.id,
            },
            {
              ...config,
              headers: {
                ...config.headers,
                'Content-Type': 'application/json',
              },
            }
          );
        }
      }

      dispatch({
        type: 'USER_COURSE_REGISTER_SUCCESS',
        payload: response.data,
      });

      // Allow ProfileScreen.js to handle the successful result.
      return response.data;

    } catch (error) {
      dispatch({
        type: 'USER_COURSE_REGISTER_FAIL',
        payload:
          error.response?.data?.detail ||
          error.response?.data ||
          error.message ||
          'Course registration failed.',
      });

      // Important: allow the calling component to detect failure.
      throw error;
    }
  };


export const userCourseDelete = (courseId) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `token ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            `/courses/courseRegister/${courseId}/`,
            config
        );

        return data;

    } catch (error) {
        console.error(
            "Delete API error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const userCourseRegisterDetailActions=()=>async (dispatch,getState)=>{
    try{
        dispatch({type:'USER_COURSE_REGISTER_DETAIL_REQUEST'})

           
        const {userLogin:{userInfo},}=getState()


        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`
            }
        }

        const {data}=await axios.get(
            '/courses/courseRegister/',  
            config
            )
        
        

        dispatch({
            type:'USER_COURSE_REGISTER_DETAIL_SUCCESS',
            payload:data
        })



    }catch(error){
        dispatch({
            type:'USER_COURSE_REGISTER_DETAIL_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}

export const userBrowseCourseActions=(course,browsingType)=>async (dispatch,getState)=>{
    try{
        dispatch({type:'USER_BROWSE_COURSE_REQUEST'})

           
        const {userLogin:{userInfo},}=getState()


        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`token ${userInfo.token}`
            }
        }

        const {data}=await axios.post(
            '/courses/browseCourse/',  
            {'course':course,'browsingType':browsingType},
            config
            )
        
        

        dispatch({
            type:'USER_BROWSE_COURSE_SUCCESS',
            payload:data
        })



    }catch(error){
        dispatch({
            type:'USER_BROWSE_COURSE_FAIL',
            payload:error.response &&  
            error.response.data.detail
                ? 
                error.response.data.detail
              
                :error.message
        })
    }
}