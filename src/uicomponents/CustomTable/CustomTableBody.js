import React from 'react'
import './CustomTableBody.css'
import { NavLink } from 'react-router-dom';
import { CustomModelComponent } from '../../uicomponents/CustomModel/CustomModel'
import { useContext, useEffect } from 'react';
import DeleteProject from '../../pages/ViewDetails/DeleteProject/DeleteProject';




const CustomTableBody = ({ data, updateRow = (e) => { }, deleteRow = (e) => { } }) => {

    const openModelComponent = useContext(CustomModelComponent)


    // console.log(data, "hello data")
    const handleActionUpdate = (item) => {
        updateRow(item)
    }

    const handleActionDelete = (item) => {
        deleteRow(item)
    }

    const openModal = (item) => {
        openModelComponent(<DeleteProject item={item} />, true);
    }
    return (
        <>
            <div className='tableBodyPart'>
                {
                    data?.header?.map((header, index) => (


                        < div className="tableColumn" >
                            <div className="tableData">
                                {header.title === "actionUpdate" ?

                                    <div className='tablecont tabletextdata tablelabel'>
                                        <p></p>
                                    </div>

                                    :
                                    <div className={`tablecont tabletextdata tablelabel ${header.title === 'Active Project' ? 'active-project' : ''}
                                ${header.title === 'Actions' ? 'actions' : ''}
                                `}>
                                        <p>{header.title}</p>
                                    </div>
                                }
                                {

                                    data?.body?.slice(0, 10).map((item, i) => (
                                        header.type === "image" ?
                                            <div className='tablecont tableimgdata'>
                                                <img src={item[header.title]} />
                                            </div>
                                            : header.type === "actionUpdate" ?
                                                <div className='tablecont tableimgdataction'>
                                                    <img src="/img/pencil.png" style={{ marginRight: "10px" }} onClick={() => handleActionUpdate(item)} />
                                                    {/* <img src="/img/bin.png" onClick={() => handleActionDelete(item)} /> */}
                                                </div>
                                                :

                                                header.type === "changeStatus" ? (
                                                    <div className='tablecont tableimgdataction'>
                                                        <img src="/img/pencil.png" onClick={() => openModal(item)} />
                                                    </div>

                                                )

                                                    :

                                                    header.type === "actions" ? (
                                                        <div className='tablecont tableimgdataction'>
                                                            <NavLink to={`/view-details/${item[header.title]}/${item.Name}`}>
                                                                <img src="/img/show.png" className='eye-icon' />
                                                            </NavLink>

                                                            <img src="/img/pencil.png" style={{ marginRight: "10px" }} onClick={() => handleActionUpdate(item)} />
                                                            <img src="/img/bin.png" onClick={() => handleActionDelete(item)} />
                                                        </div>

                                                    ) :
                                                        // <div className='tablecont tabletextdata'>
                                                        //     <p>{item[header.title]?.toString().substring(0, 25)}</p>
                                                        // </div>
                                                        <div className={`tablecont tabletextdata ${header.title === 'Active Project' ? 'active-project' : ''}`}>
                                                            <p>{item[header.title]?.toString().substring(0, 25)}</p>
                                                        </div>

                                    ))


                                }
                            </div>
                        </div>
                    ))
                } </div >
        </>
    )
}

export default CustomTableBody