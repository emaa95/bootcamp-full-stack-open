import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import AddIcon from '@mui/icons-material/Add'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initialUser, logout } from './reducers/authReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const authUser = useSelector((state) => state.authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initialUser())
    dispatch(initializeUsers())
  }, [dispatch])

  if (authUser === null) {
    return <LoginForm />
  }

  return (
    <div>
      <Menu />
      <h1 className="title">Blogs</h1>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2 style={{ color: 'white', marginLeft: '15px' }}>Create new</h2>
              <Togglable buttonLabel="create" icon={<AddIcon></AddIcon>}>
                <BlogForm />
              </Togglable>
              <div className="div-galery">
                <BlogList />
              </div>
            </div>
          }
        ></Route>
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/users/:id" element={<User />}></Route>
        <Route path="/blogs/:id" element={<Blog />}></Route>
      </Routes>
    </div>
  )
}

export default App
