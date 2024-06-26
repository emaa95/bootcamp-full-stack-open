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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`${blogObject.title} was created successfully`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      setSuccessMessage(`${blogObject.title} was updated successfully`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (e) {
      setErrorMessage(`Cannot update blog ${blogObject.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setSuccessMessage('Blog was successfully deleted')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (e) {
      setErrorMessage('Cannot delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogsSortedLike = blogs.sort((a, b) => b.likes > a.likes)

  return (
    <div>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h1 className="title">Blogs</h1>
          <Notification success={successMessage} error={errorMessage} />
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
            <BlogForm createBlog={addBlog} />
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
