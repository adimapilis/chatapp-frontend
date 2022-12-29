import React, { useContext } from 'react'
import { getUser, updateUser } from '../api/userRequest'
import { MainContext } from '../contexts/MainContext';
import "./AddFriendList.css"

const AddFriendList = ({data}) => {
  
  const { currUser, accessToken, setCurrUser, } = useContext(MainContext);
  
  const handleClick = async () => {
    try {
      await updateUser(currUser._id, {addID : data._id}, accessToken)
      const User = await getUser(currUser._id,accessToken)
      
      setCurrUser(User.data)
      
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='addfriend-list-container'>
      <div className="addfriend-list-item" onClick={handleClick}>{data.username}</div>
      <div>Add</div>
    </div>
  )
}

export default AddFriendList