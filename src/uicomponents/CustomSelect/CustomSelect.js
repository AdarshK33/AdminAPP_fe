import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CustomSelect = ({ data, label, value, onChange,className,name }) => {
    return (
        <>
            <FormControl fullWidth className={className}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    value={value}
                    label={label}
                    name={name}
                    onChange={onChange}
                >
                    {data && data.map(item => <MenuItem value={item?.id}>{item?.value}</MenuItem>)}
                </Select>
            </FormControl>

        </>
    )
}

export default CustomSelect
