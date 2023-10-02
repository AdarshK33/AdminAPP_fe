import React, { useRef, useContext, useEffect } from 'react'
import './Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationData } from '../../redux/notificationReducer'
import { CustomModelComponent } from '../../uicomponents/CustomModel/CustomModel'
import AllNotifications from '../../pages/AllNotification/AllNotifications'



const Notification = ({showNotification=false, handleNotifClick}) => {

    const openModelComponent = useContext(CustomModelComponent)

    const dispatch = useDispatch()
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleNotifClick("no")
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const handleReadAll = ()=>{
        openModelComponent(<AllNotifications/>, true);
    }
    useEffect(()=>{
        dispatch(getNotificationData({}))
    },[])
    let getNotification = useSelector(state => state.notification.data)

  return (
    <>
        <div ref={wrapperRef} className='customNotification' style={showNotification ? {display:"block", opacity:1}: {display:"none", opacity:0, transition:"visibility 0s, opacity 0.5s linear"}}>
            <div className='notifContainer'>
                <div className='nodtiAllConts'>
                    {getNotification?.data?.length > 0 && getNotification?.data?.map((e, i)=>(
                        <div className='notifCont' key={i}>
                            <div className='nottablecont nottableimgdata' id='notifimageavatar'>
                                <img src={e.users.avatar} style={{padding:"3px", background:"#fff", borderRadius:"60", borderTopRightRadius:"0"}}/>
                            </div>
                            <div className='notifContInfo'>
                                <div className='notifSenderName'>
                                    <p>{e.message}</p>
                                </div>
                                <div className='notifSenderTime'>
                                    <p>{e.modifiedAt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='readAllNotif' onClick={handleReadAll}>
                    <p>Read All Notificatios</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notification