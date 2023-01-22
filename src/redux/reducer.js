import { GET_DB } from "./actions";

const initialState = {
    data: ''
}

export default function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_DB:
            return {
                ...state, data: action.payload
            }
          
        default:
            return state
    }
}