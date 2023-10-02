import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentHeading from '../../../components/bottombar/contentbar/contentHeading'
import { clearDeleteUserSuccess, deleteUser, userData } from '../../../redux/userReducer'
import CustomDeleteModal from '../../../uicomponents/CustomModal/CustomDeleteModal'
import CustomDataTable from '../../../uicomponents/CustomTable/CustomDataTable'
import { toast } from '../../../utils/Toast'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'
import UpdateUser from '../Update/UpdateUser'

const ListUser = () => {
    const dispatch = useDispatch()
    const openModelComponent = useContext(CustomModelComponent)

    const userList = useSelector(state => state.user.data)
    const deleteUserSuccess = useSelector(state => state.user.deleteUserStatus)

    const [visible, setVisible] = useState(false)
    const [deleteData, setDeleteData] = useState({})



    const body = userList?.data?.map(e => {
        const avatar = e.avatar !== "" ? e.avatar : "/img/defaultuserpic.jpg"
        return { Image: avatar, UserID: e.user_id, Name: e.name, Email: e.email, Role: e.role, Designation: e.designation, ['Active Project']: e.current_project, Actions: e.user_id }
    })

    const data = {
        header: [
            {
                title: "UserID",
                type: "text"
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
                title: "Role",
                type: "text"
            },
            {
                title: "Designation",
                type: "text"
            },
            {
                title: "Active Project",
                type: "text"
            },
            {
                title: "Actions",
                type: "actions"
            }
            // {
            //     title: "actionUpdate",
            //     type: "actionUpdate"
            // }

        ],
        body: body
    }

    const getPageNumber = (pageNumber) => {
        dispatch(userData({ pageNumber }))
    }

    const getSearchKey = (searchKey) => {
        dispatch(userData({ searchKey }))
    }
    const updateRow = (rowId) => {
        openModelComponent(<UpdateUser user_id={rowId.UserID} />, true);

    }

    const deleteRow = (rowId) => {
        setVisible(true)
        setDeleteData(rowId)
    }
    const closeModal = () => {
        setVisible(false)
    }
    const handleDelete = () => {
        dispatch(deleteUser(deleteData?.UserID))
        setVisible(false)
    }
    useEffect(() => {
        if (userList?.status) {
            toast.success("Users listed !")
        }
    }, [userList?.status])

    useEffect(() => {
        if (deleteUserSuccess !== null) {
            dispatch(userData({}))
            dispatch(clearDeleteUserSuccess(null))
        }
    }, [deleteUserSuccess])
    return (
        <>
            <ContentHeading>Employee</ContentHeading>
            <CustomDataTable title="Employee List" addButton="/add-user" data={data} updateRow={updateRow} deleteRow={deleteRow} getPageNumber={getPageNumber} getSearchKey={getSearchKey} />
            <CustomDeleteModal visible={visible} data={deleteData} submit={handleDelete} cancel={closeModal} />

        </>
    )
}

export default ListUser
