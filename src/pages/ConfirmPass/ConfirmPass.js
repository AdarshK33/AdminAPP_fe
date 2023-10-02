import React, { useEffect, useState } from 'react'
import CustomTextField from '../../uicomponents/CustomTextField/CustomTextField'
import './ConfirmPass.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import hide from '../../asset/img/hide.png'
import show from '../../asset/img/show.png'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { addNewpass, loginData, resetConfirmTokenData } from '../../redux/loginReducer';
import { clearErrorMessage } from '../../redux/notificationReducer';

const ConfirmPass = () => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));


    const {email, token } = useParams()
    const reset_token = useSelector(state => state.login.resetToken)
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
        dispatch(addNewpass({...formData, email:email, reset_token: reset_token.reset_session_link}))
        navigate("/login")
    }
    

    useEffect(() => {
        if (loginSuccess?.success && success) {
            dispatch(clearErrorMessage())
            navigate("/dashboard")
        }
    }, [loginSuccess, success])

    useEffect(() => {
        dispatch(resetConfirmTokenData({email, token}))
    }, [])
    return (
        <div className="login-container">
            <div className="login-sec">
                <div className="login-top-sec">
                    <div><img src="/img/newlogo.png" /><h1>StackHolders</h1></div>
                    <h2>HI, Welcome Back</h2>
                    <h3>Enter new password here</h3>
                </div>
                <div className="login-bottom-sec">
                    <div>
                        <CustomTextField type="password" label="New Password" name="new_password" onChange={handleChange} />
                    </div>
                    <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Reset Password</ColorButton>
                </div>

            </div>
        </div>
    )
}

export default ConfirmPass
