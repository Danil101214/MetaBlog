import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './SignOut.scss'
import { UserContext } from '../../App'
import { PROFILE } from '../Constants'

const SignOut = ({active, setActive}) => {
  const {user, setUser} = useContext(UserContext);
  const signOutSystem = () => {
    localStorage.removeItem('user');
    setUser({})
    setActive(!active)
  }
  return (
    <div className={active ? "navbar__list-menu menu menu__none" : "navbar__list-menu menu"}>
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link to={PROFILE} onClick={() => setActive(!active)}>My profile</Link>
        </li>
        <li className="menu__list-item" onClick={signOutSystem}>Sign out</li>
      </ul>
    </div>
  )
}

export default SignOut;