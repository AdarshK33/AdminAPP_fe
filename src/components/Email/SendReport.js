import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import CustomTextField from '../../uicomponents/CustomTextField/CustomTextField'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../../redux/projectReducer';
import { sendReportToClient } from '../../redux/emailReducer';
import CustomSelector from '../../uicomponents/CustomSelector/CustomSelector';
import { toast } from '../../utils/Toast';
import './InboxTable.css'
const SendReport = () => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));
    const dispatch = useDispatch()
    const fileInputRef = useRef()
    const getClients = useSelector(state => state.client.data)
    const allProjects = useSelector(state => state.project.data)

    const [obj, setObj] = useState({
        project_id: "",
        subject: "",
        message: ""
    })

    const [formData, setFormData] = useState(null)


    let projectDropData = []
   
    allProjects?.data?.map((item, i) => {
        return projectDropData.push({ value: item.project_id, text: item.project_name })
    })
    const handleChange = (e) => {
        let { name, value } = e.target
        setObj(prev => ({ ...prev, [name]: value }))

    }
    const handleProjectChange = (item) => {
        setObj(prev => ({ ...prev, project_id: item.value }))
    }

    const changeFileHandler = (e) => {
        setFormData(e.target.files)
    }
    const handleSubmit = (e) => {
        if (!message || !subject || !formData || !project_id) {
            toast.error("Please enter all input fields")
        }

        const formDataOne = new FormData();
        formDataOne.append(
            'attach_file',
            formData?.[0],
            formData?.[0]?.name
        );
        formDataOne.append('project_id', obj.project_id)
        formDataOne.append('subject', obj.subject)
        formDataOne.append('message', obj.message)
        dispatch(sendReportToClient(formDataOne))
        fileInputRef.current.value = ""
        setFormData(null)
        e.target.value = null
        setObj({ ...obj, subject: "", message: "", project_id: "" })

    }
  

    useEffect(() => {
        dispatch(listProjects({ perPage: "all" }))
    }, [])
    const { message, subject, project_id } = obj
    return (
        <>
            <h2 className="compose-new">Compose New Message</h2>
            <CustomSelector label={"Selct Project"} defaultSelected={project_id} required={true} selectOptions={projectDropData} onChange={handleProjectChange} update />
            <CustomTextField required label="Subject" name="subject" value={subject+''} onChange={handleChange}/>

            <div style={{ display: "flex", margin: "10px 10px" }}>
                <TextareaAutosize
                    aria-label="maximum height"
                    placeholder="Type Something..."
                    name="message"
                    value={message}
                    onChange={handleChange}
                    style={{
                        width: "100%", height: 200, background: "#FFFFFF",
                        border: "1px solid #CBC9C9", fontSize: "16px", fontFamily: "Poppins", padding: "10px"
                    }}
                />
            </div>
            <div style={{ margin: "10px" }}>
                {/* <button onClick={() => fileInputRef.current.click()}  >
                    Attach File
                </button> */}
                {/* <input className='file-upload' onChange={(event) => changeFileHandler(event)} ref={fileInputRef} multiple={false} type='file' /> */}
                <CustomTextField type='file' value={subject} label="Attach" name="filer" onChange={changeFileHandler} />

            </div>
            <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Send Report</ColorButton>


        </>
    )
}

export default SendReport
