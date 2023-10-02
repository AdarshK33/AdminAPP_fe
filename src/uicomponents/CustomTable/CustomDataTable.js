import React,{useState} from 'react'
import CustomDataTablePagination from './CustomDataTablePagination';
import CustomTableBody from './CustomTableBody';
import TableHeader from './CustomTableHeader'

const CustomDataTable = ({title, addButton, data, getPageNumber=(e)=>{}, updateRow=(e)=>{}, deleteRow=(e)=>{}, getSearchKey}) => {

    return (
        <>
            <TableHeader title={title} addButton={addButton} getSearchKey={getSearchKey}/>
            
            <CustomTableBody data={data} updateRow={updateRow} deleteRow={deleteRow}/>

            <CustomDataTablePagination setPage={getPageNumber}/>
        </>
    )
}

export default CustomDataTable
