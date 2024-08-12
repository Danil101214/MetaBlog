import React, { useContext, useEffect, useState } from 'react'
import './search.scss'
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { BackgroundColorContext } from '../../App';

const Search = () => {
    const search = new URL('../../../public/Navbar/search.svg', import.meta.url).href;
    const {backgroundColor} = useContext(BackgroundColorContext)
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const findBlogs = async () => {
        try {
            const response = await axios.get("https://server-1uom.onrender.com/posts", {params: {title}})
            setPosts([...response.data])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(title.length > 3) {
            setTimeout(() => {
                findBlogs()
            }, 1000)
        }
    }, [title])
  return (
    <>
    <div className="navbar__searchBox-search search" style={backgroundColor == "#181A2A" ? {backgroundColor: "rgb(36, 37, 53)"} : {backgroundColor: "rgb(230, 230, 232)"}}>
        <input style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}} placeholder='Search' type="text" className="search__input" value={title} onChange={(event) => setTitle(event.target.value)}/>
        {title.length > 0 ? <TiDelete style={{cursor: 'pointer', paddingRight: "5px", height: "1.5em", width: "1.5em"}} onClick={() => {
            setTitle('')
            posts.length = 0
        }}/> : 
        <img className='search__img' src={search} alt="search" />} 
    </div>
    <div className="search__find">
            {posts.length > 0 && posts.map((post, index) => (
                <div className="search__find-block block" key={index} onClick={() => {
                        navigate(`MetaBlog/blogs/${post.id}`);
                        setTitle('')
                        posts.length = 0;
                    }}>
                    <h3 className="block__title">{post.title}</h3>
                    <img className='block__image' src={post.image} alt={post.title} />
                </div>
            ))}
        </div>
    </>
  )
}

export default Search