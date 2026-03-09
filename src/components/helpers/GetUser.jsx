import firebase from 'firebase/compat/app'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function GetUser() {
  const [user, setUser] = useState({})
  const Navigate = useNavigate()
  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })

    // If not logged in, do not allow access to data pages.
    if (user === null) {
      Navigate('/')
    }

    return () => unsub()
  }, [user])

  return user
}