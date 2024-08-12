import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { ABOUT_US, BLOGS, CREATEPOST, LOGIN } from '../Constants.js'
import { BackgroundColorContext, UserContext } from '../../App.jsx';
import SignOut from '../SignOut/SignOut.jsx';
import Search from '../Search/Search.jsx';

const Navbar = ({sunRef}) => {
    const logo1 = new URL('../../../public/Navbar/logo.svg', import.meta.url).href;
    const logo2 = new URL('../../../public/Navbar/logo_2.svg', import.meta.url).href;
    const {backgroundColor, setBackgroundColor} = useContext(BackgroundColorContext)
    const {user} = useContext(UserContext)
    const [active, setActive] = useState(false)
    const [activeBurger, setActiveBurger] = useState(false)

    const changeBackground = () => {
        const check = sunRef.current.checked;
        if(check) {
            setBackgroundColor("#181A2A");
            localStorage.setItem('backgroundColor', "#181A2A")
        } else {
            setBackgroundColor("#f0f2f5")
            localStorage.setItem('backgroundColor', "#f0f2f5")
        }
    }

    useEffect(() => {
        if(activeBurger) {
            document.body.classList.add("lock")
        } else {
            document.body.classList.remove("lock")
        }
    }, [activeBurger])

  return (
    <div className='navbar'>
        <div className="navbar__container">
            <div className="navbar__body">
                <Link className="navbar__logo" to={BLOGS}>
                    <img src={backgroundColor == "#181A2A" ? logo2 : logo1} alt="logo" className="navbar__logo-link"/>
                </Link>
                <div className={activeBurger ? "navbar__box active" : "navbar__box"} style={{backgroundColor: backgroundColor == "#181A2A" ? "rgb(24, 26, 42)" : "rgb(240, 242, 245)"}}>
                    <nav className="navbar__menu">
                        <ul className="navbar__list" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
                            <li className="navbar__list-item">
                                <Link to={BLOGS} className="navbar__list-link">Blogs</Link>
                            </li>
                            <li className="navbar__list-item">
                                <Link to={"#"} className="navbar__list-link">Newsletter</Link>
                            </li>
                            <li className="navbar__list-item">
                                <Link to={ABOUT_US} className="navbar__list-link">About</Link>
                            </li>
                            {user.status ? <li className="navbar__list-itemTriangle">{user.user.firstname}
                                <div onClick={() => setActive(!active)} className={active ? 'navbar__list-triangle active' : 'navbar__list-triangle'}></div>
                                {active && <SignOut active={active} setActive={setActive}/>}
                            </li>
                            :
                            <li className="navbar__list-item">
                                <Link to={LOGIN} className="navbar__list-link">Login</Link>
                            </li>}
                            {user.status && <li className='navbar__list-item'>
                                <Link to={CREATEPOST} className="navbar__list-link">Create Post</Link>
                            </li>}
                        </ul>
                    </nav>
                </div>
                <div className="navbar__searchBox">
                    <Search />
                    <label className="navbar__searchBox-switch switch">
                        <input onClick={changeBackground} ref={sunRef} className='switch__input' type="checkbox" />
                        <span className='switch__slider'></span>
                    </label>
                </div>
                <div className={activeBurger ? "navbar__burger active" : "navbar__burger"} onClick={() => setActiveBurger(!activeBurger)}>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar