import React, { useContext } from 'react'
import { createChat, findChat } from '../api/chatRequest';
import { MainContext } from '../contexts/MainContext';
import "./FriendListItem.css"

const FriendListItem = ({friendId, setSelectId}) => {

  const { currUser, users, accessToken } = useContext(MainContext);
  const other = users.find(each=> each._id===friendId)

  const handleClick = async () => {
    try {
      let chat = await findChat(friendId, currUser._id, accessToken)
      if (!chat.data.length) {
        console.log("dito")
        const newChat = await createChat({receiverId: friendId, senderId: currUser._id},accessToken)
        setSelectId(newChat.data.data)
      } else {
        setSelectId(chat.data[0]._id)
      }
      // setSelectId(chat.data.data._id)
      
    }
    catch (error) {
      console.log(error)
    }

  }
  return (
    <div onClick={handleClick} className="friend-list-item">{other?.username}</div>
  )
}

export default FriendListItem