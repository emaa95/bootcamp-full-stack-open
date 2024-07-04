import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/authReducer'
import { styled } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/system'

const Menu = () => {
  const padding = {
    paddingRight: 5,
    color: 'white',
    textDecoration: 'none',
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }))

  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px',
      }}
    >
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {authUser && (
        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <p style={{ color: 'white', marginRight: '15px' }}>
            {`${authUser.username} logged in`}
          </p>
          <ColorButton
            onClick={handleLogout}
            sx={{ backgroundColor: '#5b95d6' }}
          >
            Log out
          </ColorButton>
        </Box>
      )}
    </Box>
  )
}

export default Menu
