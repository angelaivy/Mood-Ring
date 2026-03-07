import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import MoodForm from "./form/MoodForm";
import { useEffect, useState } from "react";
import 'firebaseui/dist/firebaseui.css';
import { useNavigate } from 'react-router-dom'

export default function MoodRing() {
  const navigate = useNavigate();

  useEffect(() => {
     // Initialize the FirebaseUI Widget using Firebase.
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log('sign in successful!')
          navigate('/')
          return false;
        },
      },
    });
  }, [])
 
  const [isFormVisible, setIsFormVisible] = useState(true);

  const todaysDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div id='firebaseui-auth-container'></div>
      <div>{todaysDate}</div>
      <MoodForm 
        type='addEntry' 
        isFormVisible={isFormVisible} 
        formToggle={() => setIsFormVisible(prev => !prev)} />
    </>
    
  )
}
