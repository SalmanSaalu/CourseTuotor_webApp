export const ChatRoomReducers=(state={},action)=>{
    switch(action.type){
        case 'CHAT_ROOM_REQUEST':
            return {loading:true}

        case 'CHAT_ROOM_SUCCESS':
            return {loading:false,chatRoomDetails:action.payload}

        case 'CHAT_ROOM_FAIL':
            return {loading:false,error:action.payload}

        default:
            return state
    }
}