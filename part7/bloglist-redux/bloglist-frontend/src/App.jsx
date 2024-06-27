import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }))

  const handleLogin = (loggedInUser) => {
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(loggedInUser)
    )
    blogService.setToken(loggedInUser.token)
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      dispatch(
        showNotification(
          `${blogObject.title} was updated successfully`,
          'success',
          5
        )
      )
    } catch (e) {
      dispatch(
        showNotification(`Cannot update blog ${blogObject.title}`, 'success', 5)
      )
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(showNotification('Blog was successfully deleted', 'success', 5))
    } catch (e) {
      dispatch(showNotification('Cannot delete blog', 'error', 5))
    }
  }

  const blogsSortedLike = [...blogs].sort((a, b) => b.likes > a.likes)

  return (
    <div>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h1 className="title">Blogs</h1>
          <Notification />
          <p style={{ color: 'white', marginLeft: '15px' }}>
            {`${user.username} logged in`}{' '}
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
            {blogsSortedLike.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={updateBlog}
                deleteBlog={deleteBlog}
                currentUser={user}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
