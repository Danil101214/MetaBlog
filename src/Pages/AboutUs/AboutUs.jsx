import React, { useContext, useEffect, useState } from 'react'
import './aboutUs.scss'
import { BackgroundColorContext } from '../../App'
import Loader from '../../Components/Loader/Loader';

const AboutUs = () => {
  const blog1 = new URL('../../../public/AboutUs/blog_1.jpg', import.meta.url).href;
  const blog2 = new URL('../../../public/AboutUs/blog_2.jpg', import.meta.url).href;
  const {backgroundColor} = useContext(BackgroundColorContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearInterval(timeId)
  }, [])

  return (
    <>
    {loading ? <Loader /> :
    <div className='AboutUs'>
      <div className="AboutUs__container">
        <div className="AboutUs__inner">
          <div className="AboutUs__blockInformation">
            <p className="AboutUs__blockInformation-text" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>Meta Blog allows you to create a profile with a photo and information about yourself, leave messages on your own and other people's "walls", upload photos.
            Meta Blog offers many features that allow users to interact with each other.</p>
            <img src={blog1} className="AboutUs__blockInformation-image" />
          </div>
          <div className="AboutUs__blockInformation">
          <img src={blog2} alt="blog_2" className="AboutUs__blockInformation-image" />
          <p className="AboutUs__blockInformation-text" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}>Meta Blog provides users with the ability to leave feedback, as subscribers can comment on posts. Among the most popular is the "wall", where the user's friends can leave text messages.
          The user can control the level of access to the information published in his profile</p>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default AboutUs