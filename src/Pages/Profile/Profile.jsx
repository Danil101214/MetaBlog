import React, { useContext, useEffect, useRef, useState } from 'react'
import { BackgroundColorContext, UserContext } from '../../App'
import './Profile.scss'
import parse from "html-react-parser"
import Editor from '../../Components/Editor/Editor'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../Components/Loader/Loader'

const Profile = () => {
    const {user, setUser} = useContext(UserContext);
    const {backgroundColor} = useContext(BackgroundColorContext)
    const area = useRef();
    const [text, setText] = useState('');
    const [information, setInformation] = useState({
        description: ''
    })
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name
        setInformation((prevData) => ({...prevData, [name]: event.target.value}))
    }
    const editUser = async () => {
        setInformation((prevData) => ({...prevData, ['description']: text.length < 1 ? user.user.description : text}))
        try {
            const response = await axios.patch(`https://server-1uom.onrender.com/users/${user.user.id}`, information)
            setUser(prevData => ({...prevData, ['user']: response.data}))
              localStorage.setItem('user', JSON.stringify({
                accessToken: user.accessToken, 
                user: response.data, 
                status: true
              }))
            navigate('/' + BLOGS)
            toast("Data updated");
        } catch (error) {
            toast(error.response.data)
        }
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
          setLoading(false)
        }, 1000)
        return () => clearInterval(timeId)
      }, [])
    
  return (
    <>
    {loading ? <Loader /> :
    <section className='profile'>
        <div className="profile__container">
            <div className="profile__inner">
                <div className="profile__GeneralBox">
                    <div className="profile__GeneralBox-information information">
                        <img src={user.user.imageprofile} alt={user.user.firstname + " " + user.user.lastname} className="information__logo" />
                        <div className="information__TextBox" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
                            <p className="information__TextBox-name">{user.user.firstname + " " + user.user.lastname}</p>
                            <p className="information__TextBox-email">{user.user.email}</p>
                        </div>
                    </div>
                    <button className="profile__GeneralBox-edit" onClick={editUser}>Edit</button>
                </div>
                <div className="profile__editInformation">
                    <form action="#" className="profile__editInformation-form form" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
                        <div className="form__userBox">
                            <label className="form__userBox-label">First Name</label>
                            <input name="firstname" placeholder='Your first name' type="text" defaultValue={user.user.firstname} className="form__userBox-input" onChange={handleChange}/>
                        </div>
                        <div className="form__userBox">
                            <label className="form__userBox-label">Last Name</label>
                            <input name="lastname" placeholder='Your last name' type="text" defaultValue={user.user.lastname} className="form__userBox-input"onChange={handleChange} />
                        </div>
                        <div className="form__userBox">
                            <label className="form__userBox-label">Age</label>
                            <input placeholder='Your age' type="number" value={user.user.age} className="form__userBox-input" disabled/>
                        </div>
                    </form>
                    <div className="profile__editInformation-description description">
                        <label className="description__text">Your description</label>
                        <Editor area={area} setText={setText} placeholder="Your description"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    }
    </>
  )
}

export default Profile