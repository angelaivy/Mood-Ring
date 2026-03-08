import firebase from 'firebase/compat/app'
import { Link, useNavigate } from "react-router-dom"
import GetUser from "./helpers/GetUser"

export default function Header() {
  const user = GetUser();
  const Navigate = useNavigate();
  return (
    <>
      <h1>Mood Ring</h1>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          {user && <li>
            <Link to={'/mood-memories'}>Mood Memories</Link>
          </li>}
          {user && <li>
            <Link to={'/mood-insights'}>Mood Insights</Link>
          </li>}
          {user && <li>{user.displayName}</li>}
          {user && <li>
            <button onClick={() => {
              firebase.auth().signOut();
              Navigate('/')
            }}>Logout</button>
          </li>}
        </ul>
      </nav>
    </>
  )
}