import React from 'react'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

function Arrow(props) {
    return (
        <div className='w-[16px] h-[20px] bg-[#32323d] rounded-[50%] flex items-center justify-center'>
            {props.type === 1 ? <NorthIcon style={{ color: 'green', height: '20px', width: '15px' }} /> : <SouthIcon style={{ color: 'red', height: '20px', width: '15px' }} />}
        </div>
    )
}

export default Arrow