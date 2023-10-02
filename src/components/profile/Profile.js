import React, { useRef, useEffect, useState } from 'react';
import './Profile.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutApp } from '../../redux/loginReducer';
import { getProfileData } from '../../redux/profileReducer';
import { useSelector } from 'react-redux';



const Profile = ({ showProfile = false, handleProfileClick }) => {
    const profileDetails = useSelector(state => state.profile.data)
    
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleProfileClick("no")
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [showProf, setShowProf] = useState(showProfile)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleShowProfile = () => {
        navigate("/profile-details");
        setShowProf(false)
    }

    const handleLogout = () => {
        dispatch(logoutApp())
        localStorage.clear()
        window.location.replace("/login");
        setShowProf(false)
    }


    useEffect(() => {
        dispatch(getProfileData())
      }, [])

    useEffect(() => {
        setShowProf(showProfile)
    }, [showProfile])
    return (
        <>
            <div ref={wrapperRef}  className='pcustomNotification' style={showProf ? { display: "block", opacity: 1 } : { display: "none", opacity: 0, transition: "visibility 0s, opacity 0.5s linear" }}>
                <div className='ppnotifContainer'>
                    <div className='pnodtiAllConts'>
                        <div className="profile-user-details">{profileDetails?.user_profile?.name}</div>
                        <div className="profile-user-details">{profileDetails?.user_profile?.email}</div>
                        <div className='pnotifCont' onClick={handleShowProfile}>
                        <img className="profile-dropicon" src="/img/profileicon.png" alt="" />
                            <p>Profile</p>
                        </div>
                        <div className='pnotifCont' onClick={handleLogout}>
                            <img className="profile-dropicon" src="/img/logout.png" alt="" />
                            <p className='logout-text'>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile