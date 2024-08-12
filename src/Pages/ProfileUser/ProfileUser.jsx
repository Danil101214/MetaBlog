import React, { useContext, useEffect, useState } from 'react'
import './ProfileUser.scss'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import axios from 'axios'
import BlogsComponent from '../../Components/BlogsComponent/BlogsComponent'
import { BackgroundColorContext } from '../../App'
import Loader from '../../Components/Loader/Loader'

const ProfileUser = () => {
    const {id} = useParams();
    const {backgroundColor} = useContext(BackgroundColorContext)
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const getBlogs = async () => {
        try {
          const response = await axios.get("https://server-1uom.onrender.com/posts")
          setBlogs([...response.data])
        } catch (error) {
          toast(error.response.data)
        }
      }
    
    const getUser = async (id) => {
        try {
            const response = await axios.get(`https://server-1uom.onrender.com/users/${id}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBlogs();
      }, [])

    useEffect(() => {
        getUser(id)
    }, [id])

    useEffect(() => {
        const timeId = setTimeout(() => {
          setLoading(false)
        }, 1000)
        return () => clearInterval(timeId)
      }, [])

  return (
    <>
    {loading ? <Loader /> :
    <section className='profileUser'>
        <div className="profileUser__container">
            <div className="profileUser__inner">
                <div className="profileUser__general" style={{backgroundColor: backgroundColor == "#181A2A" ? "rgb(36, 37, 53)" : "rgb(231, 231, 233)"}}>
                    <div className="profileUser__general-block" style={{color: backgroundColor == "#181A2A" ? "rgb(186, 186, 191)" : "#000"}}>
                        <div className="profileUser__general-user user">
                            <img src={user.imageprofile} alt={user.firstname + " " + user.lastname} className="user__image" />
                            <div className="user__textBox">
                                <p className="user__textBox-name" style={{color: backgroundColor == "#181A2A" ? "rgb(255, 255, 255)" : "#000"}}>{user.firstname + " " + user.lastname}</p>
                                <p className="user__textBox-email">{user.email}</p>
                            </div>
                        </div>
                        <p className="profileUser__general-description">{user.description !== "" ? parse(String(user.description)) : "No description added"}</p>
                    </div>
                </div>
                <div className="profileUser__blog">
                    <h1 className="profileUser__blog-title">Latest Post</h1>
                    <div className="profileUser__blog-blogs blogs">
                        {blogs.filter((element) => element.idUser == id).map((blog, index) => {
                            return <BlogsComponent key={index} blog={blog} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>
    }
    </>
  )
}

export default ProfileUser