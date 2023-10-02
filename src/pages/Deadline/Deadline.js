import React, { useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./Deadline.css"
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDeadlines } from '../../redux/projectReducer';
const Deadline = () => {
    const dispatch = useDispatch()
    const projectDeadlines = useSelector(state => state.project.projectDeadlines)
    const localizer = momentLocalizer(moment)
    let events = []
    projectDeadlines?.deadlines?.map(e => {
        return events.push({ title: e.project_name,start:e.project_end_date,end: e.project_end_date })
    })

    useEffect(() => {
        dispatch(getProjectDeadlines())
    }, [])
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['day', 'month']}
                style={{ height: "100vh" }}

            />
        </div>
    )
}

export default Deadline
