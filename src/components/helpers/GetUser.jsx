import firebase from 'firebase/compat/app'
import { useEffect, useState } from "react";

export default function GetUser() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })

    return () => unsub()
  }, [user])

  return user
}