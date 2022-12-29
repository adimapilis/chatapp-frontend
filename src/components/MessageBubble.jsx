import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContext';
import "./MessageBubble.css"
const MessageBubble = ({data}) => {
  
  const { currUser } = useContext(MainContext);

  return (
    <div className={(data.senderId==currUser._id) ? "chat-bubble sent-by-user" : "chat-bubble sent-by-friend"}>
      {data.text}
    </div>
  )
}

export default MessageBubble