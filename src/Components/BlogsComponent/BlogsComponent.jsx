import React, { useContext } from 'react'
import './blogsComponent.scss'
import { useNavigate } from 'react-router-dom'
import { BackgroundColorContext, UsersGetContext } from '../../App'

const BlogsComponent = ({blog}) => {
    const {users} = useContext(UsersGetContext)
    const {backgroundColor} = useContext(BackgroundColorContext)
    const navigate = useNavigate()
  return (
    <article className="blogs__column" style={backgroundColor == "#181A2A" ? {border: "1px solid rgb(36, 37, 53)"} : {border: "1px solid rgb(232, 232, 234)"}}>
        <img src={blog.image} alt={blog.title} className='blogs__column-image' onClick={() => navigate(`${blog.id}`)}/>
        <p className="blogs__column-category">{blog.category}</p>
        <h2 className="blogs__column-title" style={backgroundColor == "#181A2A" ? {color: "#fff"} : {color: "#000"}} onClick={() => navigate(`${blog.id}`)}>{blog.title}</h2>
        <div className="blogs__column-user user">
            <div className="user__box" onClick={() => navigate(`user/${blog.idUser}`)}>
                <img src={users[Number(blog.idUser) - 1]?.imageprofile} alt="" className="user__box-image" />
                <p className="user__box-name">{users[blog.idUser - 1]?.firstname + " " + users[blog.idUser - 1]?.lastname}</p>
            </div>
            <p className="user__datePublish">{blog.date}</p>
        </div>
    </article>
  )
}

export default BlogsComponent;