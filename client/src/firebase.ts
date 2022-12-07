import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
    apiKey: 'AIzaSyDOlLyUNmN1DtnwcqDOlTdpQZ97_igFdz8',
    authDomain: 'zerotube-c2ebb.firebaseapp.com',
    projectId: 'zerotube-c2ebb',
    storageBucket: 'zerotube-c2ebb.appspot.com',
    messagingSenderId: '133673040826',
    appId: '1:133673040826:web:2f1c056615164a13dd7b83',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app
