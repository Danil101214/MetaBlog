import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogsComponent from '../../Components/BlogsComponent/BlogsComponent';
import './blogs.scss'
import Loader from '../../Components/Loader/Loader';

const Blogs = () => {
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

  useEffect(() => {
    getBlogs();
  }, [])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearInterval(timeId)
  }, [])
  return (
    <>
      {loading ? <Loader /> :
      <section className='blogs'>
        <div className="blogs__container">
          <div className="blogs__inner">
            <div className="blogs__rows">
              {blogs.length > 0 && blogs.map((blog, index) => {
                return <BlogsComponent key={index} blog={blog}/>
              })}
            </div>
          </div>
        </div>
      </section>
      }
    </>
  )
}

export default Blogs