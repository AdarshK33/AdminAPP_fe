import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateSingleUserData, updateUserByAdmin } from '../../../redux/userReducer';
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector';
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';

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

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));
const UpdateUser = ({ user_id }) => {

    const dispatch = useDispatch()
    const singleUser = useSelector(state => state.user.singleUser)
    const openModelComponent = useContext(CustomModelComponent)

    console.log("singleUser", singleUser)
    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(updateSingleUserData({ ...singleUser, [name]: value }))
        // setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleRoleChange = (item) => {
        dispatch(updateSingleUserData({ ...singleUser, role: item.value }))

        // setFormData(prev => ({ ...prev, role: item.value }))

    }
    const handleStatusChange = (item) => {
        dispatch(updateSingleUserData({ ...singleUser, status: item.value }))

        // setFormData(prev => ({ ...prev, status: item.value }))

    }
    const handleDesignationChange = (item) => {
        dispatch(updateSingleUserData({ ...singleUser, designation: item.value }))

        // setFormData(prev => ({ ...prev, status: item.value }))

    }
    const handleSubmit = () => {
        dispatch(updateUserByAdmin({ id: user_id, data: singleUser }))
        openModelComponent(<></>, false);

    }
    useEffect(() => {
        dispatch(getSingleUser(user_id))
    }, [])

    return (
        <>
            {singleUser &&

                <>
                    <p className='contentHeading'>Update User</p>
                    {singleUser?.designation}
                    <CustomTextField type="text" label="Name" value={singleUser?.name} name="name" onChange={handleChange} update />
                    <CustomSelector selectOptions={roleData} defaultSelected={singleUser?.role} label="Select Role" onChange={handleRoleChange} disabled={true} update />
                    <CustomSelector selectOptions={designationData} defaultSelected={singleUser?.designation} label="Select Designation" onChange={handleDesignationChange} update />
                    <CustomTextField type="text" value={singleUser?.email} label="Email" name="email" onChange={handleChange} update />
                    <CustomTextField type="text" value={singleUser?.email_password} label="New Email Password" name="email_password" onChange={handleChange} update />
                    <CustomTextField type="password" label="New Password" value={singleUser?.password} name="password" onChange={handleChange} update />
                    <CustomSelector selectOptions={statusData} defaultSelected={singleUser?.status} label="Select Status" onChange={handleStatusChange} disabled={true} update />

                    <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Update User</ColorButton></>}
        </>
    )
}

export default UpdateUser
