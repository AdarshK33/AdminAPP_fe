import React, { useState, useEffect, useRef } from 'react'
import './ProfileDetails.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { useDispatch } from 'react-redux'
import CustomSelector from '../../uicomponents/CustomSelector/CustomSelector';
import CustomTextField from '../../uicomponents/CustomTextField/CustomTextField';
import { getProfileData } from '../../redux/profileReducer';
import { useSelector } from 'react-redux';
import { updateProfile, addProfilePic } from '../../redux/profileReducer'




const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const ProfileDetails = () => {
  const fileInputRef = useRef()
  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.profile.data)
  const singleProData = useSelector(state => state.profile.singleProfileData)


  const [obj, setObj] = useState({
    name: '',
    email: '',
    password: "",
    email_password: ""

  })
  useEffect(() => {
    setObj(prev => ({ ...prev, name: profileDetails?.user_profile?.name, email: profileDetails?.user_profile?.email }))
  }, [profileDetails])


  const handleChange = (e) => {
    const { name, value } = e.target
    setObj(prev => ({ ...prev, [name]: value }))

  }

  const changeFileHandler = (e) => {
    const formData = new FormData();
    formData.append("profile_pic_file", e.target.files[0], e.target.files[0].name)
    dispatch(addProfilePic(formData))
    e.target.value = null
  }



  const handleSubmit = () => {
    dispatch(updateProfile(obj))
  }

  useEffect(() => {
    document.body.classList.add("profile-details-page");
    return () => {
      document.body.classList.remove("profile-details-page");
    };
  }, []);
  useEffect(() => {
    dispatch(getProfileData())
  }, [])

  return (
    <div className='profile_details'>
      <p className='contentHeading'>Profile Details</p>
      <div className="profile_details_img">
        <img style={{ width: "170px", borderRadius: "50%", border: "2px solid #ffffff" }} src={profileDetails?.user_profile?.avatar ? profileDetails.user_profile.avatar : "./img/userprofile.png"} alt="" />
        <div>
          <img className="change-profile-add" src="/img/profileadd.png" onClick={() => fileInputRef.current.click()} />
          <input onChange={(event) => changeFileHandler(event)} ref={fileInputRef} multiple={false} type='file' hidden />
        </div>
      </div>

      <CustomTextField required label="Full Name" name="name" onChange={handleChange} value={obj?.name} update />
      <CustomTextField required label="Email" name="email" value={obj?.email} onChange={handleChange} update />
      {/* <CustomTextField type="password" label="Email Password" name="email_password" onChange={handleChange} />
      <CustomTextField type="password" label="Password" name="password" onChange={handleChange} /> */}
      <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Submit</ColorButton>

    </div>

  )
}

export default ProfileDetails