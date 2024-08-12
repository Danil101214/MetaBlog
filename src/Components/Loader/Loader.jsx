import React, { useContext } from 'react'
import './Loader.scss'
import { BackgroundColorContext } from '../../App'

const Loader = () => {
  const {backgroundColor} = useContext(BackgroundColorContext)
  return (
    <div className="lds-roller" style={{color: backgroundColor == "#181A2A" ? "#FFFFFF" : "#1A1A1A"}}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}

export default Loader