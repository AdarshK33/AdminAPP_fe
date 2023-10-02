import React from 'react'
import "./CustomDeleteModal.css"
const CustomDeleteModal = ({ visible, submit, cancel }) => {
   
    return (
        <>
            {visible && <div
                id='modalCose'
                className='modal'
                open={visible}
                onClose={cancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-content'>
                    <div className="modal-style">
                    
                    <img className="delete-popupicon" src="/img/delete-popupicon.jpg" alt="" />
                        <p>Are you sure want to delete?</p>
                        <div className="delete-modal-btn-sec">
                            <button className="delete-btn" onClick={submit}>Delete</button>
                            <button className="cancel-btn" onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>}

        </>
    )
}

export default CustomDeleteModal
