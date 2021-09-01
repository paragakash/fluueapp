import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const getUserData = (id) => {
    return firestore()
        .collection('users')
        .doc(id)
        .get()
        .then(snap => {
            const user = []
            console.log(snap)
            // snap.forEach( product => products.push(product.data()))
            // return products;
        })
        .catch(err => err)
}

const allUsers = async () => {
    return await firestore().collection('users').get()
        .then(snap => {
            const userData = []
            snap.forEach(user => userData.push({ [user.id]: user.data() }))
            return products;
        })
        .catch(err => err)
}

const User = {
    getUserData, allUsers
}

export default User;