import * as actionType from '../actions/actionTypes'

const INITIAL_STATE = {
    user:null
};


export const authReducer = (state = INITIAL_STATE, action) => {
    console.log("get Data in reducer",action.payload)
    switch (action.type) {
        case actionType.USER_DATA:
        return {
            ...state,
            user:action.payload
        }
        default:
            return state
    }
};




// oyee ye tuja banda zalela  ky