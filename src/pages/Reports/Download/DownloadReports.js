import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { listProjects } from '../../../redux/projectReducer'
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector'
import './DownloadReports.css'
import CustomButton from '../../../uicomponents/CustomButton/CustomButton'
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField'
import { downloadData } from '../../../redux/dailyWorkReducer'
import moment from 'moment/moment'
import { userData } from '../../../redux/userReducer'

const DownloadReports = () => {
    const dispatch = useDispatch()
    let [fullData,setFullData] = useState(null)
    const [showDates, setShowDates] = useState(false)
    const [projectSelected, setProjectSelected] = useState("")
    const [userSelected, setUserSelected] = useState("")
    const [reportSelected, setReportSelected] = useState("")
    const [date_from, setDateFrom] = useState("")
    const [date_to, setDateTo] = useState("")

    let projectData = useSelector(state => state.project.data)
    const extraData = [{
        value: "all",
        text: "All Projects"
    }]

    const userList = useSelector(state => state.user.data)
    const userListData = [{ value: 'all', text: 'ALL' }]
    userList?.data?.filter((item, i) => {
        if (item.role === "user" || item.role === "manager")
            return userListData.push({ value: item.user_id, text: item.name })
    })

    let downloadTypes = [
        {
            value: "daily_report",
            text: "Daily Reports"
        },
        {
            value: "weekly_report",
            text: "Weekly Reports"
        },
        {
            value: "monthly_report",
            text: "Monthly Reports"
        },
        {
            value: "custom_report",
            text: "Custom Reports"
        }
    ]
    const handleProjectSelect = (item) => {
        if(Object.keys(item).length !== 0){
            dispatch(userData({ perPage: "all" , project_id: item.value }))
            setProjectSelected(item.value)
        }
    }

    const handleUserChange = (item) => {
        if(Object.keys(item).length !== 0){
            setUserSelected(item.value)
        }
    }

    const handleReportTypeSelect = (item) => {
        if(Object.keys(item).length !== 0){
            if(item.value === "custom_report"){
                setShowDates(true)
            }else{
                setShowDates(false)
            }
            setReportSelected(item.value)
        }
    }


    const handleSubmit = () => {
        if(projectSelected !== "" && reportSelected !== ""){
            if(reportSelected==="custom_report"){
                if(date_from !== "" && date_to !== ""){
                    dispatch(downloadData({project_id: projectSelected, user_id: userSelected, report_type: reportSelected, date_from: date_from, date_to, date_to}))
                }
            }else{
                dispatch(downloadData({project_id: projectSelected, user_id: userSelected, report_type: reportSelected}))
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "start_date_time") {
            let start_date_time = moment(value).format("YYYY-MM-DD")
            setDateFrom(start_date_time)
        }else if (name === "end_date_time") {
            let end_date_time = moment(value).format("YYYY-MM-DD")
            setDateTo(end_date_time)
        }
    }
    
    useEffect(()=>{
        const temp = projectData?.data?.map((e, i) => ({value: e.project_id, text: e.project_name}))
        if(temp){
            setFullData([...extraData, ...temp])
        }
    },[projectData])
   

    useEffect(()=>{
        dispatch(listProjects({perPage:"all"}))
    },[])
  return (
    <>
        <p className='contentHeading'>Download Reports</p>
        <div className='downloadReport'>
            <div className='topDownloadItems' style={{flex:1}}>
                {fullData?.length &&
                    <CustomSelector label="Select Project" required={true} name="project_id" selectOptions={fullData} onChange={handleProjectSelect}/>
                }
            </div>
            <div className='topDownloadItems' style={{flex:1}}>
                <CustomSelector label="Users" required={true} name="report_type" selectOptions={userListData} onChange={handleUserChange}/>
            </div>
            <div className='topDownloadItems' style={{flex:1}}>
                <CustomTextField required type="date" label="Start Date" name="start_date_time" onChange={handleChange} />
            </div>
            <div className='topDownloadItems' style={{flex:1}}>
                <CustomTextField required type="date" label="End Date" name="end_date_time" onChange={handleChange} />
            </div>
            <div className='topDownloadItems'>
                <CustomButton text="Download" onClick={handleSubmit}/>
            </div>
        </div>
    </>
  )
}

export default DownloadReports