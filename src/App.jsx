import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import AppRouter from './Components/AppRouter'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import ToastContainerComponent from './Components/ToastContainerComponent/ToastContainerComponent'
import axios from 'axios'

export const UserContext = createContext();
export const UsersGetContext = createContext();
export const BackgroundColorContext = createContext();

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#f0f2f5")
  const sunRef = useRef(null);
  const [user, setUser] = useState(
    {
      accessToken: "",
        user: {
          email: "",
          firstname: "",
          lastname: "",
          age: 0,
          imageprofile: "",
          id: 0,
          description: ""
        },
      status: false
  })
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
        const response = await axios.get("https://server-1uom.onrender.com/users")
        setUsers([...response.data])
    } catch (error) {
        console.log(error)
    }
}
    useEffect(() => {
      if(localStorage.getItem('user') !== null) {
        setUser(JSON.parse(localStorage.getItem('user')));
      }
    }, [])
    
    useEffect(() => {
      getUsers()
    }, [])

    useEffect(() => {
      if(localStorage.getItem('backgroundColor') !== null) {
        setBackgroundColor(localStorage.getItem('backgroundColor'))
        if(backgroundColor == "#181A2A") {
          sunRef.current.checked = true
        } else {
          sunRef.current.checked = false
        }
      }
    }, [sunRef.current?.checked])
    
    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
    }, [backgroundColor])
  return (
    <>
      <BackgroundColorContext.Provider value={{backgroundColor, setBackgroundColor}}>
        <UserContext.Provider value={{user, setUser}}>
          <Navbar sunRef={sunRef}/>
          <UsersGetContext.Provider value={{users, setUsers}}>
            <AppRouter backgroundColor={backgroundColor}/>
          </UsersGetContext.Provider>
          <Footer />
          <ToastContainerComponent />
        </UserContext.Provider>
      </BackgroundColorContext.Provider>
    </>
  )
}

export default App;