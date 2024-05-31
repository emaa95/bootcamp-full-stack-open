import { useState } from 'react'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant='contained' endIcon={props.icon} sx={{backgroundColor:'#5b95d6', marginLeft:'15px'}}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant='contained' endIcon={<CloseIcon></CloseIcon>} sx={{backgroundColor:'#5b95d6', marginTop:'15px', marginLeft:'15px'}}>Cancel</Button>
      </div>
    </div>
  )
}

export default Togglable