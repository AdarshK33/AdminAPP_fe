import React, { useEffect, useState } from 'react'
import './CustomDataTablePagination.css'

const CustomDataTablePagination = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tempPageNumber, setTempPageNumber] = useState(1);

  const [showPageNoSubmit, setShowPageNoSubmit] = useState(false)
  const handleChange = (e)=>{
    if(e.target.value === "") {
      setShowPageNoSubmit(false)
      setTempPageNumber("")
    }
    else {
      if(e.target.value < 1){
        setTempPageNumber(1)
      }else{
        setTempPageNumber(e.target.value)
      }
      setShowPageNoSubmit(true) 
    }
  }

  const handlePageSubmit = () => {

    setPageNumber(tempPageNumber)
    setShowPageNoSubmit(false) 
  }
  const handleIncrement = ()=>{
    setPageNumber(prev => ++prev)
  }

  const handleDecrement = ()=>{
    if(pageNumber === 1 || pageNumber < 1){
      setPageNumber(1)
    }else{
      setPageNumber(prev => --prev)
    }
  }

  useEffect(()=>{
    props.setPage(pageNumber)
    setTempPageNumber(pageNumber)
  }, [pageNumber])
  
  return (
    <div className='tablePaginationContainer'>
      <div className='pageContents'>
          <div className='pagesNumber' onClick={handleDecrement} style={pageNumber <= 1 ? {background: "#0d8bf338"} : {background: "#0d8df3"}}>
            <p>&lt;</p>
          </div>
          <div className='paginationInput'>
            <input type="number" placeholder='Page No' value={tempPageNumber===0 ? setTempPageNumber(1) : tempPageNumber} onChange={handleChange}/>
          </div>
          <div className='paginationPageSubmitButton' onClick={handlePageSubmit} style={showPageNoSubmit ? {display: "block", opacity: 1,  animation: "fade 1s", visibility: "visible", transition: "all 0.5s"} : {display: "none", opacity: 0, visibility: "hidden", transition: "all 0.5s"}}>
            <img src='/img/submit.png' />
          </div>
          <div className='pagesNumber' onClick={handleIncrement}>
            <p>&gt;</p>
          </div>
      </div>
    </div>
  )
}

export default CustomDataTablePagination