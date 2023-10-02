import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInboxData } from '../../redux/emailReducer'
import moment from 'moment'
import "./InboxTable.css"

const InboxTable = () => {
    const dispatch = useDispatch()
    const inboxData = useSelector(state => state.email.data)

    useEffect(() => {
        dispatch(getInboxData())
    }, [])
    return (
        <>
            <p className='contentHeading'>Inbox</p>
            {inboxData?.result?.length && <>   <div className="inbox-head-sec"></div>
                <div className="inbox-sec">
                    {inboxData?.result && inboxData?.result?.map((e, i) => (
                        <div className="inbox-body-sec">
                            <p className="inbox-from">{e?.from?.[0].split('<')[0]}</p>
                            <p className="inbox-sub">{e?.subject?.[0]}</p>
                            <p className="inbox-date">{moment(e?.date?.[0]).format("hh:mm A")}</p>
                        </div>
                    ))}
                </div>
            </>}
        </>
    )
}

export default InboxTable
