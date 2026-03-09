import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import MoodForm from "./form/MoodForm";
import { useEffect, useState } from "react";
import 'firebaseui/dist/firebaseui.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './MoodRing.css'

export default function MoodRing() {
  const auth = getAuth();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const todaysDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  useEffect(() => {
     // Initialize the FirebaseUI Widget using Firebase.
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    if (!isLoggedIn) {
      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
        signInSuccessUrl: '/',
      });
    }
  }, [isLoggedIn]) 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
    return () => unsubscribe();
  }, []);
 
  return (
    <>
      <div className='homepageDate'><p>{todaysDate}</p></div>
      {!isLoggedIn && <div className='landing'>
        <h1>Mood Ring</h1>
        <p>Mood Ring ✨ Your daily mood journal. Track how you're feeling, reflect on your patterns, and understand yourself a little better — one mood at a time. Sign in to get started!</p>
        <div id='firebaseui-auth-container'></div> 
      </div>
      }
      {isLoggedIn && <MoodForm 
        type='addEntry' 
        isFormVisible={isFormVisible} 
        formToggle={() => setIsFormVisible(prev => !prev)} />}
    </>
    
  )
}
