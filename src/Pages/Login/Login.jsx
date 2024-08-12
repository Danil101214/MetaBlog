import React, { useContext, useEffect, useState } from 'react'
import FormRegister from '../../Components/Form/FormRegister'
import { authorization } from '../../Components/ArraysComponent'
import { Link, useNavigate } from 'react-router-dom'
import { BLOGS, REGISTRATION } from '../../Components/Constants'
import './Login.scss'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BackgroundColorContext, UserContext } from '../../App'
import Loader from '../../Components/Loader/Loader'

const Login = () => {
  const person = new URL('../../../public/RegistrationAndLogin/person.png', import.meta.url).href;
  const navigate = useNavigate();
  const {backgroundColor} = useContext(BackgroundColorContext)
  const {setUser} = useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(true)

  const loginUser = async (event) => {
    event.preventDefault()
    let flag = false
    for(let [key, value] of Object.entries(data)) {
      if(value.length < 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast(`Please write ${key}`)
        flag = true
      }
    }
    if(!flag) {
      try {
        const response = await axios.post("https://server-1uom.onrender.com/signin", {
          email: data.email,
          password: data.password
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
        toast("Welcome in system");
        navigate(BLOGS)
      } catch (error) {
        toast(error.response.data)
      }
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
    <section className='login'>
      <div className="login__container">
        <div className="login__inner">
          <form action="#" className="login__form form" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
            <h1 className="form__title">Sign in</h1>
            <p className="form__subtitle">If you don’t have an account register</p>
            <p className="form__titleLogin">You can <Link to={"/" + REGISTRATION} className='form__titleLogin-link' style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "rgb(12, 33, 193)"}}>Register here !</Link></p>
            {authorization.map(({labelName, Item, placeholder, type}, index) => {
              const name = labelName.toLowerCase().trim().replace(' ', '');
              return <FormRegister labelName={labelName} Item={Item} placeholder={placeholder} type={type} key={index} name={name} setData={setData}/>
            })}
            <button className='form__button' onClick={loginUser}>Login</button>
          </form>
          <div className="login__textBox">
            <div className="login__textBox-container">
              <div className="login__textBox-content content">
                <img src={person} alt="person" className='content__image'/>
                <h1 className='content__title'>Sign in to name</h1>
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

export default Login