import React, { useEffect } from 'react'
import Notification from '../notification/Notification'
import './topbar.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkActiveNotification, clearErrorMessage, getNotificationData, seenNotification } from '../../redux/notificationReducer'
import Profile from '../profile/Profile'
import { useNavigate } from 'react-router-dom'
import { getProfileData } from '../../redux/profileReducer'
import { io } from 'socket.io-client'

const Topbar = (props) => {
  const profileDetails = useSelector(state => state.profile.data)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activeNotification = useSelector(state => state.notification.activeNotification.active_notification)
  const checkisActive = useSelector(state => state.notification.error)

  const [showNotification, setShowNotification] = useState(false)
  const [showProfile, setShowProfile] = useState(false)




  const handleNotifClick = (show) => {
    if (show === "no") {
      setShowNotification(false)
    } else {
      setShowNotification(prev => !prev)
    }
    dispatch(seenNotification())
  }

  const handleProfileClick = (show)=>{
    if(show==="no"){
      setShowProfile(false)
    }else{
      setShowProfile(prev => !prev)
    }
  }

  if (checkisActive === 'Invalid user token') {
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    dispatch(getProfileData())
  }, [profileDetails?.user_profile?.avatar])
  

  useEffect(()=>{
    dispatch(checkActiveNotification())
  }, [showNotification])


  //Socket Communication
  // let token = localStorage.getItem("token")
  // let socket = io('http://localhost:8000', {
  //   query: {token}
  // })
  // socket.emit("createMessage", "data from react")


  // useEffect(()=>{
  //   socket.on("getMessage",(data)=>{
  //   })


  //   socket.on("message",(data)=>{
  //   })
  // })


  // useEffect(() => {
  //   //dispatch(getProfileData())
  // }, [profileDetails])

  return (
    <div className="topbar">
      <div className="topleft">
        <div className="logo">
          <img src="/img/newlogo.png" alt="" />
          <h3>StackHolders</h3>
        </div>
        <div className="nav" onClick={props.handleCollapse}>
          <img src="/img/nav.png" alt="" className="navimg" />
        </div>
      </div>

        <div className="topright">
          <div className="nav">
            {activeNotification > 0 &&
              <div className='activeNotification' onClick={handleNotifClick}><p>{activeNotification}</p></div>
            }
            <img src="/img/bell.png" className="notimg" alt="" onClick={handleNotifClick}/>
            <Notification showNotification={showNotification} handleNotifClick={handleNotifClick}/>
          </div>
          <div className="profile" onClick={handleProfileClick}>
            <div className="profileimg">
              <img src={profileDetails?.user_profile?.avatar?profileDetails?.user_profile?.avatar:"./img/userprofile.png"} alt="" />
              <Profile showProfile={showProfile} handleProfileClick={handleProfileClick}/>
            </div>
            <img src="/img/settings.png" className="setimg" alt="" />
          </div>
        </div>
      </div>
  )
}

export default Topbar