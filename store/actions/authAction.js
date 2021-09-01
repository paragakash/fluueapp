import * as actiontype from './actionTypes'
import firestore from '@react-native-firebase/firestore';

const GET_CURRENT_USER = 'GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

export const getUsers = () => {
    return async (dispatch)=>{
        return await firestore().collection('users').get().then((snap) => {
            let userser = [];
            snap.forEach(user => userser.push({  [user.id]: user.data() }))
            dispatch({
                type: actiontype.USER_DATA,
                payload: userser
            })
        })
    } 
};


