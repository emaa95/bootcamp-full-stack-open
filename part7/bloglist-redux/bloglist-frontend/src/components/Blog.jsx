import { Card, Button } from '@mui/material'
import { useState } from 'react'
import './Blog.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.authUser)

  const handleLike = () => {
    dispatch(updateBlog(blog))
    dispatch(
      showNotification(`${blog.title} was updated successfully`, 'success', 5)
    )
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(showNotification('Blog was successfully deleted', 'success', 5))
    }
  }

  const isCreator = blog.user.username === authUser.username ? true : false

  if (blogVisible === false) {
    return (
      <div style={hideWhenVisible} className="div-card">
        <Card className="card">
          <h1>{blog.title}</h1>{' '}
          <Button
            variant="contained"
            onClick={() => setBlogVisible(true)}
            endIcon={<VisibilityIcon></VisibilityIcon>}
            sx={{ backgroundColor: '#5b95d6' }}
          >
            view
          </Button>
        </Card>
      </div>
    )
  } else {
    return (
      <div style={showWhenVisible} className="div-card2">
        <Card className="card">
          <h1>{blog.title}</h1>{' '}
          <Button
            onClick={() => setBlogVisible(false)}
            variant="contained"
            endIcon={<VisibilityOffIcon />}
            sx={{ backgroundColor: '#5b95d6' }}
          >
            hide
          </Button>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p data-testid="likes">{blog.likes}</p>
          <div className="div-buttons">
            <Button
              onClick={handleLike}
              variant="contained"
              className="button like-button"
              data-testid="like-button"
            >
              <FavoriteIcon className="heart-icon" />
            </Button>
            {isCreator && (
              <Button
                onClick={handleRemove}
                variant="contained"
                className="button"
                data-testid="delete-button"
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
}

export default Blog
