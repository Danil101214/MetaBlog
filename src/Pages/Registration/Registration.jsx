import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BLOGS, LOGIN } from '../../Components/Constants'
import { register } from '../../Components/ArraysComponent'
import FormRegister from '../../Components/Form/FormRegister'
import axios from 'axios'
import './Registration.scss'
import { toast } from 'react-toastify'
import { BackgroundColorContext, UserContext } from '../../App'
import Loader from '../../Components/Loader/Loader'

const Registration = () => {
  const person = new URL('../../../public/RegistrationAndLogin/person.png', import.meta.url).href;
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext);
  const {backgroundColor} = useContext(BackgroundColorContext)
  const [data, setData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    datebirthday: Date,
    imageprofile: "",
    password: "",
    confirmpassword: ""
  })
  const [loading, setLoading] = useState(true)

  const registerUser = async (event) => {
    let flag = false
    event.preventDefault()
    for(let [key, value] of Object.entries(data)) {
      if(value.length < 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast(`Please write ${key}`)
        flag = true
      }
    }
    if(!flag && data.password !== data.confirmpassword) {
      toast("Passwords must match")
      flag = true
    }
    if(!flag) {
      try {
        const response = await axios.post("https://server-1uom.onrender.com/register", {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          age: calculateAge(data.datebirthday),
          imageprofile: data.imageprofile,
          password: data.password,
          description: ''
        })
        setUser({
          accessToken: response.data.accessToken, 
          user: response.data.user, 
          status: true
        })
        localStorage.setItem('user', JSON.stringify({
          accessToken: response.data.accessToken, 
          user: response.data.user, 
          status: true
        }))
        toast("Registration successful")
        navigate('/' + BLOGS)
      } catch (error) {
        toast(error.response.data)
      }
    }
  }
  function calculateAge(date) {
    const datebirday = new Date(date)
    var ageDifMs = Date.now() - datebirday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
    <section className='registration'>
      <div className="registration__container">
        <div className="registration__inner">
          <form action="#" className="registration__form form">
            <h1 className="form__title" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>Sign up</h1>
            <p className="form__subtitle" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>If you already have an account register</p>
            <p className="form__titleLogin" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>You can <Link style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "rgb(12, 33, 193)"}} to={"/" + LOGIN} className='form__titleLogin-link'>Login here !</Link></p>
            {register.map(({labelName, Item, placeholder, type}, index) => {
              const name = labelName.toLowerCase().trim().replace(' ', '');
              return <FormRegister labelName={labelName} Item={Item} placeholder={placeholder} type={type} key={index} name={name} setData={setData}/>
            })}
            <button className='form__button' onClick={registerUser}>Register</button>
          </form>
          <div className="registration__textBox">
            <div className="registration__textBox-container">
              <div className="registration__textBox-content content">
              <img src={person} alt="person" className='content__image'/>
              <h1 className='content__title'>Sign Up to name</h1>
              <h2 className='content__subtitle'>Lorem Ipsum is simply</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    }
    </>
  )
}

export default Registration;