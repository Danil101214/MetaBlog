import React, { useContext } from 'react'
import './editor.scss'
import { LuEraser } from 'react-icons/lu'
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";
import { applyFormat } from './apply-format';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const Editor = ({area, setText, placeholder}) => {
    const {user} = useContext(UserContext)
    const handleClick = (selectType) => {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const selectedText = range.toString();
        const newWord = applyFormat(selectType, selectedText)
        const fragment = range.createContextualFragment(newWord)
        range.deleteContents()
        range.insertNode(fragment)
        setText(area.current.innerHTML)
    }
  return (
    <div className="description__box">
        <div data-placeholder={placeholder} suppressContentEditableWarning={true} contentEditable="true" ref={area} onInput={(event) => setText(event.currentTarget.innerHTML)} name="input" id="edit-input" className="description__box-input">{window.location.href === "http://localhost:5173/profile" && user.user.description}</div>
            <div className="description__box-buttons buttons">
                <button className='buttons__button' onClick={() => setText('')}>
                    <LuEraser />
                </button>
                <button className='buttons__button' onClick={() => handleClick("bold")} >
                    <FaBold />
                </button>
                <button className='buttons__button' onClick={() => handleClick("italic")}>
                    <FaItalic />
                </button>
                <button className='buttons__button' onClick={() => handleClick("underline")}>
                    <FaUnderline />
                </button>
            </div>
        </div>
  )
}

export default Editor