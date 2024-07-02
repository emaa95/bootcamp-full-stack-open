import { useState } from 'react'
import Notification from '../components/Notification'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person'
import { styled } from '@mui/material/styles'
import loginImage from '../assets/login.jpg'
import './LoginForm.css'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const username = event.target.username.value
      const password = event.target.password.value
      event.target.username.value = ''
      event.target.password.value = ''
      dispatch(login(username, password))
    } catch (error) {
      dispatch(showNotification('Wrong credentials...', 'error', 5))
    }
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }))

  return (
    <div className="div-principal">
      <Notification />
      <form onSubmit={handleLoginFormSubmit} className="div-form">
        <img
          src={loginImage}
          width={'100%'}
          height={'40%'}
          loading="lazy"
          style={{ borderRadius: '8px' }}
        />
        <FormControl variant="outlined" fullWidth style={{ margin: '15px 0' }}>
          <InputLabel
            htmlFor="outlined-adornment-username"
            sx={{ color: 'white' }}
            data-testid="username"
          >
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            endAdornment={
              <InputAdornment position="end">
                <PersonIcon style={{ color: 'white' }} />
              </InputAdornment>
            }
            label="Username"
            name="username"
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth style={{ margin: '15px 0' }}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: 'white' }}
            data-testid="password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff style={{ color: 'white' }} />
                  ) : (
                    <Visibility style={{ color: 'white' }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            inputProps={{ style: { color: 'white' } }}
          />
        </FormControl>
        <ColorButton
          variant="contained"
          type="submit"
          fullWidth
          style={{ margin: '15px 0' }}
          sx={{ backgroundColor: '#5b95d6' }}
        >
          Log in
        </ColorButton>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
