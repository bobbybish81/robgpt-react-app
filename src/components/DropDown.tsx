import React from 'react';
import { IChatHistory } from '../interfaces/IChatHistory';
import { BiComment, BiTrash } from 'react-icons/bi';
import '../styles/DropDown.css';

interface DropDownProps {
  chatHistory: IChatHistory[],
  openDropdown: boolean,
  displayPreviousChat: (title : string) => void,
  deleteChat: (title : string) => void,
  deleteChatHistory: () => void,
  toggle: () => void,
}

const DropDown = ({
  chatHistory,
  openDropdown,
  displayPreviousChat,
  deleteChat,
  deleteChatHistory,
  toggle } : DropDownProps) => {

  const chatTitles = Array.from(new Set(chatHistory.map(chat => chat.chatTitle)));

  const dropdownStyles = {
    Active: {
      height: 'auto',
      padding: '0.75rem 1rem'
    },
    Inactive: {
      height: '0',
      padding: '0'
    }
  }

  return (
    <section
      className='history-dropdown'
      style={openDropdown ? dropdownStyles.Active : dropdownStyles.Inactive}>
      <ul className='history-ul'
        style={{display: openDropdown ? 'block' : 'none'}}>
          {chatTitles.length > 0 ? chatTitles?.map((title, index) => (
            <li key={index}>
              <BiComment className='dropdown-comment-icon'/>
              <p
                className='dropdown-history-text'
                onClick={()=> {
                  displayPreviousChat(title);
                  toggle();
                }}>{title}</p>
              <BiTrash
                className='dropdown-trash-icon'
                onClick={()=> {
                  deleteChat(title);
                  toggle();
                }}/>
            </li>
          )) : null}
      </ul>
      {chatHistory?.length > 0 ?
        <div
          className='delete-history'
          style={{ display: openDropdown ? 'flex' : 'none' }}
          onClick={() => {
            deleteChatHistory();
            toggle();
          }}>
          <h6>Delete History</h6>
          <BiTrash />
        </div> :
      null}
    </section>
  )
}

export default DropDown