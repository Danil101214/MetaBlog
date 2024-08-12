import React, { useContext, useEffect, useRef, useState } from 'react'
import './CreatePost.scss'
import Editor from '../../Components/Editor/Editor'
import axios from 'axios'
import { BLOGS } from '../../Components/Constants'
import { useNavigate } from 'react-router-dom'
import { options } from '../../Components/ArraysComponent'
import { BackgroundColorContext, UserContext } from '../../App'
import moment from 'moment';
import { toast } from 'react-toastify'
import Loader from '../../Components/Loader/Loader'

const CreatePost = () => {
  const drop = new URL('../../../public/Form/Drop.svg', import.meta.url).href;
  const area = useRef();
  const [text, setText] = useState('')
  const {user} = useContext(UserContext)
  const {backgroundColor} = useContext(BackgroundColorContext)
  const [information, setInformation] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    comments: new Array(),
    date: moment().format('LL'),
    idUser: 0
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const handleChange = (event) => {
    const name = event.target.name
    if(name == "image") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setInformation(prevData => ({...prevData, "image": reader.result}))
      }
      reader.readAsDataURL(file);
    } else {
      setInformation(prevData => ({...prevData, [name]: event.target.value}))
    }
  }
  const createPost = async (event) => {
    event.preventDefault()
    let flag = false
    setInformation(prevData => ({...prevData, ['description']: text, ['idUser']: user.user.id}))
    for(let [key, value] of Object.entries(information)) {
      if(value.length < 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if(key !== 'comments') {
          toast(`Please write ${key}`)
          flag = true
        }
      }
    }
    if(!flag) {
      try {
        await axios.post("https://server-1uom.onrender.com/posts", information)
        toast("Post created");
        navigate('/' + BLOGS)
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
    <section className='createPost'>
      <div className="createPost__container">
        <div className="createPost__inner">
          <h1 className="createPost__title" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>Create Post</h1>
          <form action="#" className="createPost__form form">
            <div className="form__GeneralBox">
              <div className="form__GeneralBox form__ImageBox">
                <input onChange={handleChange} type="file" id='file-input' name='image'/>
                <label htmlFor="file-input" className='form__ImageBox-label'>
                  <img src={drop} alt="Drop" className='form__ImageBox-image'/>
                  Drop your image here
                </label>
              </div>
              <div className="form__GeneralBox-textBox form__textBox" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
                <div className="form__textBox-information information">
                  <label htmlFor='title-input' className="information__title">Title</label>
                  <input name='title' onChange={handleChange} id='title-input' type="text" className='information__input' placeholder='Once upon a time...'/>
                </div>
                <div className="form__textBox-information information">
                  <label htmlFor='title-input' className="information__title">Category</label>
                  <select id='title-input' name='category' onChange={handleChange} className='information__input'>
                    <option value="Choose category" disabled selected hidden>Choose category</option>
                    {options.map(({value}, index) => {
                      return <option key={index} value={value}>{value}</option>
                    })}
                  </select>
                </div>
                <div className="form__textBox-information information">
                  <label htmlFor='description-input' className="information__title">Description</label>
                  <Editor area={area} setText={setText} placeholder="The start of a wonderful story..."/>
                </div>
                <div className="form__textBox-button button">
                  <button className='button__Post' onClick={createPost}>Post</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    }
    </>
  )
}

export default CreatePost