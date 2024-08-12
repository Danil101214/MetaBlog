import React, { useContext, useEffect, useState } from 'react'
import './BlogInformation.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Comments from '../../Components/Comments/Comments';
import { BackgroundColorContext } from '../../App';
import Loader from '../../Components/Loader/Loader';

const BlogInformation = () => {
  const {id} = useParams();
  const [blog, setBlog] = useState({})
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([])
  const {backgroundColor} = useContext(BackgroundColorContext)
  const [loading, setLoading] = useState(true)

  const getBlog = async (id) => {
    try {
      const response = await axios.get(`https://server-1uom.onrender.com/posts/${id}`)
      setBlog(response.data)
      setComments([...response.data.comments])
    } catch (error) {
      toast(error.response.data)
    }
  }

  const getUser = async (id) => {
    try {
      const response = await axios.get(`https://server-1uom.onrender.com/users/${id}`)
      setUser(response.data)
    } catch (error) {
      toast(error.response.data)
    }
  }

  useEffect(() => {
    getBlog(id)
  }, [id])

  useEffect(() => {
    if(Object.keys(blog).length !== 0) {
      getUser(blog.idUser)
    }
  }, [blog.idUser])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearInterval(timeId)
  }, [])
  
  return (
    <>
    {loading ? <Loader /> :
    <section className='blogInformation'>
      <div className="blogInformation__container">
        <div className="blogInformation__inner" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
          <p className="blogInformation__category">{blog.category}</p>
          <h1 className="blogInformation__title">{blog.title}</h1>
          <div className="blogInformation__user user">
            <div className="user__textBox">
              <img src={user.imageprofile} alt={user.firstname + " " + user.lastname} className="user__textBox-image" />
              <p className="user__textBox-name">{user.firstname + " " + user.lastname}</p>
            </div>
            <p className="user__date">{blog.date}</p>
          </div>
          <img src={blog.image} alt={blog.title} className="blogInformation__image" />
          <p className="blogInformation__description">{blog.description}</p>
        </div>
      </div>
      <Comments id={id} blog={blog} setBlog={setBlog} comments={comments} setComments={setComments}/>
    </section>
    }
    </>
  )
}

export default BlogInformation;