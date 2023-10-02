import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentHeading from '../../../components/bottombar/contentbar/contentHeading'
import { clearDeleteProjectSuccess, deleteProject, listProjects } from '../../../redux/projectReducer'
import CustomDeleteModal from '../../../uicomponents/CustomModal/CustomDeleteModal'
import CustomDataTable from '../../../uicomponents/CustomTable/CustomDataTable'
import { toast } from '../../../utils/Toast'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'
import UpdateProject from '../Update/UpdateProject'
const ListProject = () => {
  const openModelComponent = useContext(CustomModelComponent)

  const dispatch = useDispatch()
  const getProjects = useSelector(state => state.project.data)
  const deleteProjectSuccess = useSelector(state => state.project.deleteProjectStatus)

  const role = localStorage.getItem("role")
  const [visible, setVisible] = useState(false)
  const [deleteData, setDeleteData] = useState({})
  const body = getProjects?.data?.map(e => ({ Image: "/img/projecticon.jpg", ProjectID: e.project_id, Client: e.clients.client_name, ProjectName: e.project_name, StartDate: e.project_start_date, EndDate: e.project_end_date, Manager: e.manager.user_name, key: e.project_id }))
  const data = {
    header: [
      {
        title: "Image",
        type: "image"
      },
      {
        title: "ProjectID",
        type: "text"
      },
      {
        title: "Client",
        type: "text"
      },
      {
        title: "ProjectName",
        type: "text"
      },
      {
        title: "StartDate",
        type: "date"
      },
      {
        title: "EndDate",
        type: "date"
      },
      {
        title: "Manager",
        type: "text"
      },

      {
        title: "actionUpdate",
        type: "actionUpdate"
      }
    ],
    body: body
  }
  if (role === "manager") {
    data.header.pop()
  }
  const getPageNumber = (pageNumber) => {
    dispatch(listProjects({ pageNumber }))
  }

  const getSearchKey = (searchKey) => {
    dispatch(listProjects({ searchKey }))
  }
  const updateRow = (rowId) => {
    openModelComponent(<UpdateProject project_id={rowId.key} />, true);
  }

  const deleteRow = (rowId) => {
    setVisible(true)
    setDeleteData(rowId)
  }
  const closeModal = () => {
    setVisible(false)
  }
  const handleDelete = () => {
    dispatch(deleteProject(deleteData?.projectID))
    setVisible(false)
  }
  useEffect(() => {
    if (deleteProjectSuccess !== null) {
      dispatch(listProjects({}))
      dispatch(clearDeleteProjectSuccess(null))
    }
  }, [deleteProjectSuccess])
  useEffect(() => {
    if (getProjects?.status) {
      toast.success("Projects listed !")
    }
  }, [getProjects?.status])



  return (
    <>
      <ContentHeading>Projects List</ContentHeading>
      <CustomDataTable title="Projects List" addButton={role === "admin" ? "/add-project" : ""} data={data} updateRow={updateRow} deleteRow={deleteRow} getPageNumber={getPageNumber} getSearchKey={getSearchKey} />
      <CustomDeleteModal visible={visible} data={deleteData} submit={handleDelete} cancel={closeModal} />
    </>
  )
}

export default ListProject
