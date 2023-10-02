import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentHeading from '../../../components/bottombar/contentbar/contentHeading'
import { clearClientSuccess, deleteClient, getClientsData } from '../../../redux/clientReducer'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'
import CustomDataTable from '../../../uicomponents/CustomTable/CustomDataTable'
import UpdateClient from '../Update/UpdateClient'
import './ListClients.css'
import Modal from '@mui/material/Modal';
import CustomDeleteModal from '../../../uicomponents/CustomModal/CustomDeleteModal'
import { toast } from '../../../utils/Toast'

const ListClients = () => {

  const openModelComponent = useContext(CustomModelComponent)

  const dispatch = useDispatch()
  let getClients = useSelector(state => state.client.data)
  const deleteClientSuccess = useSelector(state => state.client.deleteClient)
  const updateClient = useSelector(state => state.client.updateClient)
  const role = localStorage.getItem("role")

  const [visible, setVisible] = useState(false)
  const [deleteData, setDeleteData] = useState({})

  const body = getClients?.data?.map(e => (
    { Image: "/img/clienttable.png", Name: e.client_name, Email: e.client_email, Contact: e.client_contact, Address: e.client_address, Status: "Active", Key: e.client_id }
  ))
  const data = {
    header: [
      {
        title: "Image",
        type: "image"
      },
      {
        title: "Name",
        type: "text"
      },
      {
        title: "Email",
        type: "text"
      },
      {
        title: "Contact",
        type: "text"
      },
      {
        title: "Address",
        type: "text"
      },
      {
        title: "Status",
        type: "text"
      },
      {
        title: "actionUpdate",
        type: "actionUpdate"
      }
    ],
    body: body,
  }
  if (role === "manager") {
    data.header.pop()
  }
  const closeModal = () => {
    setVisible(false)
  }


  const getPageNumber = (pageNumber) => {
    if (pageNumber) {
      dispatch(getClientsData({ pageNumber }))
    }
  }

  const getSearchKey = (searchKey) => {
    if (searchKey !== "") {
      dispatch(getClientsData({ searchKey }))
    }
  }

  const updateRow = (rowId) => {
    openModelComponent(<UpdateClient client_id={rowId.Key} />, true);
  }

  const deleteRow = (rowId) => {
    setVisible(true)
    setDeleteData(rowId)
  }
  const handleDelete = () => {
    dispatch(deleteClient(deleteData?.Key))
    setVisible(false)
  }


  useEffect(() => {
    if (deleteClientSuccess !== null) {
      dispatch(getClientsData({}))
      dispatch(clearClientSuccess(null))
    }
  }, [deleteClientSuccess])
  useEffect(() => {
    if (getClients?.status) {
      toast.success("Clients listed !")
    }
  }, [getClients?.status])
  return (
    <>
      <ContentHeading>Clients List</ContentHeading>
      <CustomDataTable title="Clients List" addButton="/add-client" data={data} updateRow={updateRow} deleteRow={deleteRow} getPageNumber={getPageNumber} getSearchKey={getSearchKey} />
      <CustomDeleteModal visible={visible} data={deleteData} submit={handleDelete} cancel={closeModal} />
    </>
  )
}

export default ListClients