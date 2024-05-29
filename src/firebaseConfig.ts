import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserPopupRedirectResolver, browserSessionPersistence, FacebookAuthProvider, getAuth, GoogleAuthProvider, reload, signInWithPopup, signInWithRedirect, signOut, User } from "firebase/auth"
import * as firebase from "firebase/auth"
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { Capacitor, ExceptionCode } from '@capacitor/core';
import { getDatabase } from "firebase/database";


// Initialize Firebase
let app = initializeApp({
    apiKey: "AIzaSyDZ2SsfwRIAyo4zsz-tOTRdiFz0LCvFY-A",
    authDomain: "orderme-c0395.firebaseapp.com",
    projectId: "orderme-c0395",
    storageBucket: "orderme-c0395.appspot.com",
    messagingSenderId: "615841800678",
    appId: "1:615841800678:web:e458abc0f260cd4043f627",
    measurementId: "G-M87NZ4FX4C",
    databaseURL: localStorage.getItem("database") || ""
});
const analytics = getAnalytics(app);
if (Capacitor.isNativePlatform()) {
    initializeAuth(app, {
        // persistence: indexedDBLocalPersistence
        persistence: indexedDBLocalPersistence
        // popupRedirectResolver: browserPopupRedirectResolver,
        // popupRedirectResolver: browserPopupRedirectResolver
    });
}

const auth = getAuth()
export async function loginUser(email: string, password: string) {
    try {
        const res = await firebase.signInWithEmailAndPassword(auth, email, password)
        console.log(res)
        return true
    }
    catch (error: any) {
        console.warn(error.code)
        if (error.code === "auth/wrong-password") {
            alert("The password you entered does not match to this user.");
        }
        else if (error.code === "auth/user-not-found") {
            alert("Please check your email input, user not found")
        }
        else if (error.code === "auth/invalid-email") {
            alert("Invalid email. Please check your email input")
        }
        else if (error.code === "auth/too-many-requests")
            alert("Too many requests")

        return false
    }
}

export async function changeDB(url: string) {
    var conf = {
        apiKey: "AIzaSyDZ2SsfwRIAyo4zsz-tOTRdiFz0LCvFY-A",
        authDomain: "orderme-c0395.firebaseapp.com",
        databaseURL: url,
        projectId: "orderme-c0395",
        storageBucket: "orderme-c0395.appspot.com",
        messagingSenderId: "615841800678",
        appId: "1:615841800678:web:e458abc0f260cd4043f627",
        measurementId: "G-M87NZ4FX4C"
    };

    app = initializeApp(conf)
}

export async function loginWithGoogle() {
    try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        // provider.addScope('profile');
        // provider.addScope('email');
        await signInWithRedirect(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result;
            console.warn("google user: " + JSON.stringify(user))
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.warn("Zgodila se je napaka")
            console.warn(error)
            console.warn(errorCode)
            return false
            // ...
        });

        return true
    }
    catch (error) {
        console.warn(error)
        return false
    }
}

export async function loginWithFacebook() {
    const auth = getAuth()
    const provider = new FacebookAuthProvider()

    await signInWithRedirect(auth, provider).then((result) => {
        // The signed-in user info.
        const user = result

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        console.warn("facebook user: " + JSON.stringify(user))
        // ...
    })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.warn("Zgodila se je napaka")
            console.warn(error)
            console.warn(errorCode)
            return false
            // ...
        });
    return true
}

export async function logOut() {
    const auth = getAuth()
    await signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.removeItem("googleUser")
        localStorage.removeItem("cart")
        alert("Sign out successful")
        window.location.reload()
    }).catch((error) => {
        alert("Error Sign out")
        console.warn("Napaka pri sign out! " + error)
        // An error happened.
    });
}

export async function registerUser(email: string, password: string) {
    try {
        const res = await firebase.createUserWithEmailAndPassword(auth, email, password)
        return res
    }
    catch (error) {
        return null
    }
}

export async function getAuthState() {
    firebase.getAuth().onAuthStateChanged(async function (user) {
        if (user) {
            console.warn("user prijavljen: " + JSON.stringify(user));
            localStorage.setItem("prijavljen", "true")
            localStorage.setItem("user", JSON.stringify(user))
            return true
        } else {
            console.warn("User ni prijavljen")
            localStorage.removeItem("prijavljen")
            localStorage.removeItem("user")
            return false
        }
    });
}