import React from 'react'
import BottomBar from "../../components/bottombar";
import Topbar from "../../components/topbar/topbar";
import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import { useEffect } from 'react';
import MobileSidebar from '../../uicomponents/MobileSidebar/MobileSidebar';
import CustomLoader from '../../uicomponents/CustomLoader/CustomLoader';
import CustomModel from '../../uicomponents/CustomModel/CustomModel';


const Layout = () => {

  const [windowSize, setWindowSize] = useState(null)
  const [collapse,setCollapse] = useState(true)
  const [Desktopsidebar, setDesktopSidebar] = useState(true);

  useEffect(() => {
      const handleResize = () => {
          setWindowSize(window.innerWidth)
      }
      if(windowSize<1200)setCollapse(false)
      else setCollapse(true)

      if(windowSize < 900){
        setDesktopSidebar(false)
      }else{
        setDesktopSidebar(true)
      } 
      window.addEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)

      return () => window.removeEventListener('resize', handleResize)
  }, [windowSize])

  useEffect(()=>{
    setWindowSize(window.innerWidth)
  }, [collapse])

    const handleCollapse = ()=>{
      setCollapse(prev => !prev)
    }
  return (
    <>
        <CustomModel >
          <CustomLoader />
          {!Desktopsidebar && <MobileSidebar collapse={collapse} handleCollapse={handleCollapse}/>}
          <Topbar handleCollapse={handleCollapse}/>
          <BottomBar collapse={collapse} Desktopsidebar={Desktopsidebar}>
              <Outlet />
          </BottomBar>
        </CustomModel>
    </>
  )
}

export default Layout