import firebase from 'firebase/compat/app'
import { Link, useNavigate } from "react-router-dom"
import GetUser from "./helpers/GetUser"
import './Header.css'
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react'

export default function Header() {
  const user = GetUser();
  const Navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };

  const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
      Navigate('/')
      closeSideBar()
      setIsLoggedIn(false)
    })
    .catch((e) =>{
      console.error('An error happened on signout', e);
    });
  }

  return (
    <header>
      {user && <h1>Mood Ring</h1>}
      <Menu
        isOpen={isOpen}
        onStateChange={handleStateChange}
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
        right
      >
      <nav>
        <ul>
          <li>
            <Link to={'/'} onClick={closeSideBar}>Home</Link>
          </li>
          {user && <li>
            <Link to={'/mood-memories'} onClick={closeSideBar}>Mood Memories</Link>
          </li>}
          {user && <li>
            <Link to={'/mood-insights'} onClick={closeSideBar}>Mood Insights</Link>
          </li>}
          {user && <li>{user.displayName}</li>}
          {user && <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>}
        </ul>
      </nav>
      </Menu>
    </header>
  )
}