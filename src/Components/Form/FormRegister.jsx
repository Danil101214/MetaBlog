import React, { useContext, useState } from 'react'
import './FormRegister.scss'
import { BackgroundColorContext } from '../../App'

const FormRegister = ({labelName, Item, placeholder, type, name, setData}) => {
  const {backgroundColor} = useContext(BackgroundColorContext);
  const [active, setActive] = useState("active");
  const handleChange = (event) => {
    const name = event.target.name
    if(name == "imageprofile") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prevData => ({...prevData, "imageprofile": reader.result}))
      }
      reader.readAsDataURL(file);
    } else {
      setData(prevData => ({...prevData, [name]: event.target.value}))
    }
  }
  return (
    <div className="form__box" style={{borderBottom: backgroundColor == "#181A2A" && "2px solid #fff"}}>
      <label htmlFor="#" className='form__box-label'>{labelName}</label>
      <div className="form__box-bottom bottom">
      <label htmlFor="#">
        <Item fill={backgroundColor == "#181A2A" && "white"} className={`bottom__image${backgroundColor == "#181A2A" ? " " + active : ""}`}/>
      </label>
      <input style={{colorScheme: backgroundColor == "#181A2A" && "dark"}} id={name} name={name} onChange={handleChange} placeholder={placeholder} type={type} className={`bottom__input${backgroundColor == "#181A2A" ? " " + active : ""}`}/>
      </div>
    </div>
  )
}

export default FormRegister;