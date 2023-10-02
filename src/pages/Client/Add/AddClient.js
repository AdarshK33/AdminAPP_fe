import React, { useEffect, useState } from 'react'
import './AddClient.css'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { addClient } from '../../../redux/clientReducer'
import {useDispatch,useSelector} from 'react-redux'
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';
import { useNavigate } from 'react-router-dom';
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector';


const AddClient = () => {
  const navigate=useNavigate()
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
  const dispatch = useDispatch()
  let clientAddSuccess = useSelector(state => state.client.addClient)

  const [formdata, setFormData] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSelect = (item) => {
  }
  const handleSwitchChange = (e) =>{
    const value = formdata.status === 'In Active' ? 'Active' : 'In Active'
    setFormData(prev => ({ ...prev, status: value }))
  }
  const handleSubmit = () => {
    dispatch(addClient(formdata))
    setSuccess(true)
  }
  useEffect(() => {
    if (success && clientAddSuccess?.success) {
      navigate("/all-clients")
    }
  }, [success, clientAddSuccess])

  return (
    <>
      <p className='contentHeading'>Add Client</p>
        <CustomTextField required label="Name" name="name" value="" onChange={handleChange}/>
        <CustomTextField required label="Email" name="email" onChange={handleChange}/>
        <CustomTextField required label="Phone" name="contact" onChange={handleChange}/>
        <CustomTextField required label="Address" name="address" onChange={handleChange}/>
        <FormControlLabel control={<Switch defaultChecked name="status" onChange={handleSwitchChange}/>} label="Status"/><br />
        <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Add Client</ColorButton>
     
    </>

  )
}

export default AddClient