import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContext';
import "./ChatListItem.css"

const ChatListItem = ({data, setSelectId}) => {

  const { currUser, users } = useContext(MainContext);
  const otherId = data.members.find(each=> each != currUser._id)
  const other = users.find(each=> each._id===otherId)
  let date = new Date(data.createdAt)
  const time = date.toDateString()
  return (
    <div className="chat-container" onClick={()=>setSelectId(data._id)}>
      <div className="chat-name">{other?.username}</div>
      <div className="chat-time">{time}</div>
    </div>
  )
}

export default ChatListItem