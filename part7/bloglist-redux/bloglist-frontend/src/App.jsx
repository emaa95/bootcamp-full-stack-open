import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initialUser, logout } from './reducers/authReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'

const App = () => {
  const authUser = useSelector((state) => state.authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initialUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }))

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      {authUser === null ? (
        <LoginForm />
      ) : (
        <div>
          <h1 className="title">Blogs</h1>
          <Notification />
          <p style={{ color: 'white', marginLeft: '15px' }}>
            {`${authUser.username} logged in`}{' '}
            <ColorButton
              onClick={handleLogout}
              sx={{ backgroundColor: '#5b95d6' }}
            >
              Log out
            </ColorButton>
          </p>
          <h2 style={{ color: 'white', marginLeft: '15px' }}>Create new</h2>
          <Togglable buttonLabel="create" icon={<AddIcon></AddIcon>}>
            <BlogForm />
          </Togglable>
          <div className="div-galery">
            <BlogList />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
