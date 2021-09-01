import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken, GraphRequestManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setuserData } from '../store/actions/authAction';

const googleLogin = async () => {
    // Get the users ID token
    const { idToken, user } = await GoogleSignin.signIn();
    console.log("user", user)

    if(user){
        createUserInDb(user.id, user.name, user.email, user.photo)
    }
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential)
}

const facebookSignIn = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
    console.log(await result)

    if (result.isCancelled) {
        throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    auth().signInWithCredential(facebookCredential)
}


const createUserInDb = async (uid, fullName, email, photo) => {
    try {
        await firestore().collection('users').doc(uid).set(
            {
                uid,
                fullName,
                email,
                photo
            })
    }
    catch (err) {
        console.log(err)
    }
    
}

// signup handling
const signUp = (fullName, email, password) => {
    if (!fullName || !email || !password) {
        Alert.alert('Error', 'Please enter all fields')
    }

    return auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            const { uid } = cred.user;

            auth().currentUser.updateProfile({
                displayName: fullName
            })

            Alert.alert("user Create..")
            return uid

        })
        .then(uid => createUserInDb(uid, fullName, email))
        .catch(
            err => Alert.alert(err.code, err.message)
        )
}

const signIn = (email, password) => {
    if (!email || !password) {
        Alert.alert('Error', 'Please enter all fields')
    }

    return auth().signInWithEmailAndPassword(email, password)
        .then(() => { })
        .catch(
            err => Alert.alert(err.code, err.message)
        )
}

const forgetPassword = (email) => {
    if (!email) {
        Alert.alert('Error', 'Please enter email')
    }

    return auth().sendPasswordResetEmail(email)
}

const signOut = async () => {
    return auth().signOut()
}

const sendOtp = async (number) => {
    if (!number) {
        Alert.alert('Error', 'Please Enter number')
    }
    console.log('otpSend')
    return auth().signInWithPhoneNumber(number)
    //await auth().settings.isAppVerificationDisabledForTesting
}

const confirmCode = async (state, code) => {
    try {
        console.log(state, ":", code)
        await state.confirm(code)
        return true
    }
    catch (err) {
        console.log(err)
    }
}

const Auth = {
    signUp,
    signIn,
    forgetPassword,
    signOut,
    facebookSignIn,
    googleLogin,
    sendOtp,
    confirmCode
}

export default Auth