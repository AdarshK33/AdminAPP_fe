import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import CustomSelect from '../../../uicomponents/CustomSelect/CustomSelect';
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../redux/userReducer';
import { useNavigate } from "react-router-dom"
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector';

const roleData = [
  {
    value: "manager",
    text: "Manager"
  },
  {
    value: "user",
    text: "User"
  },
  {
    value: "admin",
    text: "Admin"
  }
]
const statusData = [
  {
    value: "Active",
    text: "Active"
  },
  {
    value: "In Active",
    text: "In Active"
  }
]

const designationData = [
  {
    value: "Tester",
    text: "Tester"
  },
  {
    value: "Developer",
    text: "Developer"
  },
  {
    value: "BA",
    text: "BA"
  },
  {
    value: "HR",
    text: "HR"
  },
  {
    value: "Sr. Developer",
    text: "Sr. Developer"
  },
  {
    value: "Data Analyst",
    text: "Data Analyst"
  },
  {
    value: "Lead",
    text: "Lead"
  },
  {
    value: "Project Manager",
    text: "Project Manager"
  }

]

const AddUser = () => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addUserSuccess = useSelector(state => state.user.addUser)
  const [formDate, setFormData] = useState({})
  const [success, setSuccess] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleRoleChange = (item) => {
    setFormData(prev => ({ ...prev, role: item.value }))

  }
  const handleStatusChange = (item) => {
    setFormData(prev => ({ ...prev, status: item.value }))

  }
  const handleDesignationChange = (item) => {
    setFormData(prev => ({ ...prev, designation: item.value }))

  }
  const handleSubmit = () => {
    dispatch(addUser(formDate))
    setSuccess(true)
  }
  useEffect(() => {
    if (addUserSuccess?.success && success) {
      navigate("/all-users")
    }
  }, [addUserSuccess, success])
  return (
    <>
      <p className='contentHeading'>Add Employee</p>
      <CustomTextField required type="text" label="Name" name="name" onChange={handleChange} />
      <CustomSelector selectOptions={roleData} required={true} label="Select Role" onChange={handleRoleChange} />
      <CustomSelector selectOptions={designationData} required={true} label="Select Designation " onChange={handleDesignationChange} />
      <CustomTextField required type="text" label="Email" name="email" onChange={handleChange} />
      <CustomTextField required type="text" label="Email Password" name="email_password" onChange={handleChange} />
      <CustomTextField required type="text" label="Password" name="password" onChange={handleChange} />
      <CustomSelector selectOptions={statusData} required={true} label="Select Status" onChange={handleStatusChange} />
      <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Add User</ColorButton>
    </>
  )
}

export default AddUser
