import React, { useState, useEffect, useContext } from 'react'
import './DeleteProject.css';
import { useDispatch, useSelector } from 'react-redux'
import { unassignProject } from '../../../redux/userReducer';
import { useParams } from 'react-router-dom';
import { getSingleUserProject } from '../../../redux/userReducer'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';


const DeleteProject = (item) => {
  const openModelComponent = useContext(CustomModelComponent)

  const [unAssign, setunAssign] = useState(null)
    
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const projectId = item['ProjectId'];

  const dispatch = useDispatch()

  const { id } = useParams();
  console.log(id, "userIDinpopup")

  
  const handleSubmit = () => {
    const payload = {
      user_id: id,
      project_id: unAssign?.['Project Id'],
      status :(unAssign?.Status == "Active")? "In-Active" : "Active"
    };
    dispatch(unassignProject( payload))
    openModelComponent(<></>, false);
  }

  useEffect(() => {
    Object.entries(item).map(([key, value]) => {
      setunAssign(value)
     });
}, [item])


const closeModal = () => {
  openModelComponent(<></>, false);
}

  return (
    <>
    <div>
      {unAssign?.Status === "Active" ? (
        <div>Are you sure you want to inactive the project from user?</div>
      ) : (
        <div>Are you sure you want to activate the project from user?</div>
      )}
    </div>
    <div class="button-container">
      {/* <button class="btn-yes" onClick={()=>handleSubmit}>Yes</button> */}
      <ColorButton variant="contained"  onClick={handleSubmit}>yes</ColorButton>
      <button class="btn-no" onClick={closeModal}>No</button> 
    </div>
    </>
  )
}

export default DeleteProject