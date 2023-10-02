import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import CustomTextField from '../../uicomponents/CustomTextField/CustomTextField'


const ConfigPage = () => {
 
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const handleChange = ()=>{

    }

    const handleSubmit = ()=>{

    }

  return (
    <>
      <p className='contentHeading'>Configuration</p>
        <CustomTextField required label="Name" name="name" value="" onChange={handleChange}/>
        <CustomTextField required label="Email" name="email" onChange={handleChange}/>
        <CustomTextField required label="Phone" name="contact" onChange={handleChange}/>
        <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Add Client</ColorButton>
     
    </>

  )
}

export default ConfigPage