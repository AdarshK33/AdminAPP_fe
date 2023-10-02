import React, { useContext, useEffect, useState } from 'react'
import './UpdateClient.css'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { addClient, getSingleClientData, updateClient, updateSingleClient } from '../../../redux/clientReducer'
import {useDispatch,useSelector} from 'react-redux'
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';
import { useNavigate } from 'react-router-dom';
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'



const UpdateClient = ({client_id}) => {

  const openModelComponent = useContext(CustomModelComponent)
  const navigate=useNavigate()
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    dispatch(getSingleClientData(client_id))
  },[])

  let clientAddSuccess = useSelector(state => state.client.addClient)
  let client_data = useSelector(state => state.client.singleClient)
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(updateSingleClient({...client_data, [name]: value}))
  }

  const handleSwitchChange = (e) =>{
    const value = client_data.status === 'In Active' ? 'Active' : 'In Active'
    dispatch(updateSingleClient({ ...client_data, status: value }))
  }
  const handleSubmit = () => {
    dispatch(updateClient({client_id, data:client_data}))
    setSuccess(true)
    openModelComponent(<></>, false);
  }
  
  useEffect(() => {
    if (success && clientAddSuccess?.success) {
      navigate("/all-clients")
    }
  }, [success, clientAddSuccess])

  const isEmpty = (obj) => {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

  return (
    <>
      { !isEmpty(client_data) && 
        <div>
          <p className='contentHeading'>Update Client</p>
          <CustomTextField required label="Name" name="name" onChange={handleChange} value={client_data.name} update/>
          <CustomTextField required label="Email" name="email" onChange={handleChange} value={client_data.email} update/>
          <CustomTextField required label="Phone" name="contact" onChange={handleChange} value={client_data.contact} update/>
          <CustomTextField required label="Address" name="address" onChange={handleChange} value={client_data.address} update/>
          {client_data?.status==="In Active" &&
            <FormControlLabel control={<Switch name="status" onChange={handleSwitchChange}/>} label="Status" update/>
          }
          {client_data?.status==="Active" &&
            <FormControlLabel control={<Switch name="status" defaultChecked onChange={handleSwitchChange}/>} label="Status" update/>
          }
            <br />
            <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Update Client</ColorButton>
        </div>}
    </>

  )
}

export default UpdateClient