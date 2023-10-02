import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getNotificationByTypeData } from '../../redux/notificationReducer'
import CustomSelector from '../../uicomponents/CustomSelector/CustomSelector'
import './AllNotifications.css'

const AllNotifications = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const notif = useSelector(state => state.notification.databytype)
    console.log("notifnotifnotif", notif);
    const handleChange = (item)=>{
        console.log("notifnotifnotif", notif);
        if(notif && notif.data){
            setData(notif?.data[item?.value])
        }
    }
    const types = [{
        value: "task_creation",
        text: "Task Creation"
    },{
        value: "project_creation",
        text: "Project Creation"
    },{
        value: "project_completion",
        text: "Project Completion"
    },{
        value: "project_deadline",
        text: "Project Deadline"
    },{
        value: "weekly_report",
        text: "Weekly Report"
    }]

    useEffect(()=>{
        dispatch(getNotificationByTypeData())
    },[])
  return (
    <>
        <p className='contentHeading all-notifications-heading'>All Notifications</p>
        <CustomSelector className="all-notifications-search" selectOptions={types} label="Select Type" onChange={handleChange} />
        <div className='allNotifContainer'>
        
            {data?.map(e => (
                <div className='allnotifItems'>
                    <div className='allnotifItemscontentImg'>
                        <img src={e?.users?.user_avatar ? e?.users?.user_avatar : "/img/defaultuserpic.jpg"} alt="" />
                    </div>
                    <div className='allnotifItemscontentText'>
                        <p>{e.message}</p>
                        <p>{e.createdAt}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default AllNotifications