import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import MoodForm from "./form/MoodForm";
import { useEffect, useState } from "react";
import 'firebaseui/dist/firebaseui.css';
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function MoodRing() {
  const auth = getAuth();
  const Navigate = useNavigate();
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

  onAuthStateChanged(auth, (user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
 
  return (
    <>
      {!isLoggedIn && <div id='firebaseui-auth-container'></div>}
      <div><h2>{todaysDate}</h2></div>
      {isLoggedIn && <MoodForm 
        type='addEntry' 
        isFormVisible={isFormVisible} 
        formToggle={() => setIsFormVisible(prev => !prev)} />}
    </>
    
  )
}
