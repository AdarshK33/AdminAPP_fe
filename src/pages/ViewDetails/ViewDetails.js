import React from 'react';
//import { getSingleUserProject} from '../../../redux/userReducer';
import { getSingleUserProject } from '../../redux/userReducer';
import CustomDataTable from '../../uicomponents/CustomTable/CustomDataTable'
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ContentHeading from '../../components/bottombar/contentbar/contentHeading'
import './ViewDetails.css'
import { CustomModelComponent } from '../../uicomponents/CustomModel/CustomModel'
import AssignProjectToEmployee from './AssignProjectToEmployee/AssignProjectToEmployee';


const ViewDetails = () => {

  const openModelComponent = useContext(CustomModelComponent)


  const userProject = useSelector(state => state.user.singleUserProject)
  console.log(userProject, "datatest")


  const body = userProject?.data?.user_project_data?.map(e => {
    return {
      ['Project Id']: e?.project_id, ['Project Name']: e?.project_name, Type: e?.project_type, Client: e?.client_name, Description: e?.project_description,
      StartDate: e?.project_start_date, Status: e?.user_project_status
    }
  })

  const data = {
    header: [
      {
        title: "Project Id",
        type: "text"

      },
      {
        title: "Project Name",
        type: "text"
      },
      {
        title: "Type",
        type: "text"
      },
      {
        title: "Client",
        type: "text"
      },
      {
        title: "Description",
        type: "text"
      },
      {
        title: "StartDate",
        type: "text"
      },
      {
        title: "Status",
        type: "text"
      },
      {
        title: "Unassign",
        type: "changeStatus"
      }

    ],
    body: body
  }

  const { id, name } = useParams();
  // console.log(useParams(), "prams")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleUserProject(id))
  }, [])


  const openModal = () => {
    openModelComponent(<AssignProjectToEmployee />, true);
  }

  return (
    <>
      <button id="assignProject" onClick={() => openModal()}>Assign New Project</button>
      <ContentHeading>Employee{`/`} Projects{`/`} {name}</ContentHeading>
      <CustomDataTable data={data} />
    </>

  )

}

export default ViewDetails