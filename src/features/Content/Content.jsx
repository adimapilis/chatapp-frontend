import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userChats } from '../../api/chatRequest';
import { createMessage, getChatMessage } from '../../api/messageRequest';
import { getAllUser } from '../../api/userRequest';
import AddFriendList from '../../components/AddFriendList';
import ChatListItem from '../../components/ChatListItem';
import FriendListItem from '../../components/FriendListItem';
import MessageBubble from '../../components/MessageBubble';
import { MainContext } from '../../contexts/MainContext';
import "./Content.css"

const Content = () => {
  
  const [chatlist, setChatlist] = useState([])
  const [selectId, setSelectId] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const { currUser, accessToken, setUsers, users} = useContext(MainContext);

  const navigate = useNavigate()

  // navigate to Login if not logged
  useEffect (() => {
    if (!currUser._id) navigate('/login')
  },[])
  
  // fetch list of Chats
  useEffect(() => {
    const getChats = async () => {
      try {
        const chats = await userChats( currUser._id, accessToken )
        setChatlist(chats.data)
      }
      catch (error) {
        console.log(error)
     }
    }
    getChats()
  }, [currUser._id, selectId])

  // fetch chat messages
  useEffect(() => {
    if (selectId) getChat()
  },[selectId])

  // fetches all existing user
  useEffect(() => {
    getUsers()
  },[currUser])

  const getChat = async () => {
    try {
      const message = await getChatMessage(selectId, accessToken)
      setChatMessages(message.data)
    }
    catch (error) {
      setChatMessages([])
      console.log(error)
    }
  }

  const getUsers = async () => {
    try {
      const allUsers = await getAllUser(accessToken)
      setUsers(allUsers.data)
    }
    catch (err) {
      console.log(error)
    }
  }


  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }
  
  const handleSubmit = () => {
    if (!newMessage) return
    const data = {
      chatId: selectId,
      senderId: currUser._id,
      text: newMessage,
    }
    setNewMessage("")
    try {
      createMessage(data,accessToken)
      getChat()
    }
    catch (error) {
      console.log(error)
    }
  }

  const chat = chatlist?.find(each=> each._id==selectId)
  const selectedFriendId = chat?.members?.find(each=>each!=currUser._id)
  const selectedFriend = users?.find(each=> each._id==selectedFriendId)
  const dontshow = currUser?.friends?.concat(currUser?._id)

  console.log(selectId)
  return (
    <div className="content">
      <div className="chats-container">
        <div className="label">Chats</div>
        <div className="chat-list">
          {chatlist.map(each=> 
            <ChatListItem key={each._id} data={each} setSelectId={setSelectId}/>
          )}
        </div>
      </div>

      <div className='conversation-container'>
        <div className="conversation-header">{selectedFriend ? selectedFriend.username : "Pick Contact to Start Chat" }</div>
        <div className="chat-selected">
          {chatMessages.map(each => 
            <MessageBubble key={each._id} data={each} />
          )}
        </div>
        <form className="chat-form" onSubmit={e => e.preventDefault()}>
          <textarea className="chat-input" value={newMessage} id="add-chat" onChange={handleChange}/>
          <button className="chat-input-button" onClick={handleSubmit}>Send</button>
        </form>
      </div>

      <div className="contacts-container">
        <div className="label">Contacts</div>
            {currUser?.friends?.map(each=> 
              <FriendListItem key={each} friendId={each} setSelectId={setSelectId}/>
            )}
      </div>

      <div className="addcontact-container">
        <div className="label">Add Contact</div>
            {users.filter(each=> !dontshow.includes(each._id)).map( each => 
               <AddFriendList key={each._id} data={each}></AddFriendList>
            )}
      </div>
      
    </div>
  )
}

export default Content