import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { authUserRouter, userRouter } from '../router'
import { UserContext } from '../App'
const AppRouter = ({backgroundColor}) => {
  const {user} = useContext(UserContext);
  return (
    <main className='main' style={{flexGrow: 1, padding: "24px 0px 80px 0px", color: backgroundColor == "#090D1F" ? "#FFFFFF" : "#1A1A1A"}}>
        <Routes>
            {user.status ? authUserRouter.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            }) : 
            userRouter.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })}
        </Routes>
    </main>
  )
}

export default AppRouter