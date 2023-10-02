import React, { useEffect, useState } from 'react'
import CustomTextField from '../../uicomponents/CustomTextField/CustomTextField'
import './Changepass.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import hide from '../../asset/img/hide.png'
import show from '../../asset/img/show.png'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from '../../redux/loginReducer';
import { clearErrorMessage } from '../../redux/notificationReducer';

const Changepas = () => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginSuccess = useSelector(state => state.login.data)
    const [formData, setFormData] = useState({})
    const [success, setSuccess] = useState(false)
    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        dispatch(loginData(formData))
        setSuccess(true)

    }
    
    useEffect(() => {
        if (loginSuccess?.success && success) {
            dispatch(clearErrorMessage())
            navigate("/dashboard")
        }
    }, [loginSuccess, success])
    return (
        <div className="login-container">
            <div className="login-sec">
                <div className="login-top-sec">
                    <div><img src="/img/newlogo.png" /><h1>StackHolders</h1></div>
                    <h2>HI, Welcome Back</h2>
                    <h3>Enter your credentials to continue</h3>
                </div>
                <div className="login-bottom-sec">
                    
                    <div>
                        <CustomTextField type="text" label="New Password" name="password" onChange={handleChange} />
                    </div>
                    
                    
                    <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Reset password</ColorButton>
                </div>

            </div>
        </div>
    )
}

export default Changepas
