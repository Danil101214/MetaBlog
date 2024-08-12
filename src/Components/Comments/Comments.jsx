import React, { useContext, useState } from 'react'
import { BackgroundColorContext, UserContext, UsersGetContext } from '../../App'
import './comments.scss'
import axios from 'axios'

const Comments = ({id, comments, setComments}) => {
    const {user} = useContext(UserContext)
    const {users} = useContext(UsersGetContext)
    const {backgroundColor} = useContext(BackgroundColorContext)
    const [comment, setComment] = useState({
        idUser: 0,
        description: ""
    })
    const handleClick = async (event) => {
        event.preventDefault()
        setComments((prevData) => [...prevData, prevData[comments.length] = comment])
        try {
            await axios.patch(`https://server-1uom.onrender.com/posts/${id}`, {
                comments: comments
            })
            setComment((prevData) => ({...prevData, idUser: 0, ['description']: ''}))
        } catch (error) {
            toast(error.response.data)
        }
    }
    
  return (
    <section className='comments'>
        <div className="comments__container">
            <div className="comments__inner">
                <h2 className="comments__title" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>{comments.length} Comments</h2>
                {user.status && <form action="" className="comments__form">
                    <img src={user.user.imageprofile} alt="" className="comments__form-image" />
                    <div className="comments__form-block block">
                        <input placeholder='Write your comment...' type="text" className="block__input" value={comment.description} onChange={(event) => setComment((prevData) => ({...prevData, ['idUser']: user.user.id, ['description']: event.target.value}))}/>
                        <div className="block__buttons">
                            <button className="block__buttons-button" onClick={handleClick} disabled={comment.description.length > 0 ? false : true}>Send</button>
                        </div>
                    </div>
                </form>}
                <div className="comments__users">
                    {comments?.length > 0 && comments?.map((comments, index) => 
                        <div className="comments__users-comment comment" key={index} style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>
                            <img src={users[Number(comments.idUser) - 1]?.imageprofile} alt={users[Number(comments.idUser) - 1]?.firstname + " " + users[Number(comments.idUser) - 1]?.lastname} className="comment-image" />
                            <div className="comment__block">
                                <p className="comment__block-name">{users[Number(comments.idUser) - 1]?.firstname + " " + users[Number(comments.idUser) - 1]?.lastname}</p>
                                <p className="comments__block-text">{comments.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Comments;