
import React, { useState, useEffect } from 'react';
import AuthNavogator from "./AuthNavogator";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { setuserData, getUsers } from "../store/actions/authAction";
import { User } from '../services/user'

import firestore from '@react-native-firebase/firestore';

export const MainNavigator = () => {

    const [initializing, setInitializing] = useState(true);

    const [user, setUser] = useState();

    const state = useSelector(state => state)

    console.log("state", state)
    console.log("auth user", user)

    const dispatch = useDispatch()

    const onAuthStateChanged = (user) => {
        setUser(user);
        //dispatch(setuserData(user))
        dispatch(getUsers())
        if (initializing) setInitializing(false);
    }

    useEffect(async () => {
        GoogleSignin.configure({
            webClientId: "660085159372-9vmv0n9dt6otg5r420k07t3b9l6c4h1h.apps.googleusercontent.com",
            offlineAccess: true
        });

        const subscriber = await auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe n ounmount
    }, []);

    return <NavigationContainer>
        {user ? <AppNavigator />  : <AuthNavogator />  } 
        {/* <AuthNavogator /> */}
    </NavigationContainer>
}

