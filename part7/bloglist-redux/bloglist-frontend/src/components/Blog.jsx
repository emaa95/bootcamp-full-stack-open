import { useState } from 'react'
import { Card, Button, TextField, Icon } from '@mui/material'
import './Blog.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog, commentBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import url from '../assets/icons8-url-24.png'

const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const authUser = useSelector((state) => state.authUser)

  if (!blog) {
    return null
  }

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

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(id, comment))
    setComment('')
  }

  const isCreator = blog.user?.username === authUser.username

  return (
    <div className="div-card">
      <Card className="card">
        <div className="title-div">
          <h1>{blog.title}</h1>
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
        <div className="url-div">
          <Icon sx={{ color: 'white' }}>
            <img src={url} alt="url" height="15" width="15" />
          </Icon>
          <p>{blog.url}</p>
        </div>
        <p>{blog.author}</p>
        <div className="likes-div">
          <p data-testid="likes">{blog.likes}</p>
          <Button
            onClick={handleLike}
            variant="contained"
            className="button like-button"
            data-testid="like-button"
          >
            <FavoriteIcon className="heart-icon" />
          </Button>
        </div>
        <h4>Comments</h4>
        {blog.comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          blog.comments.map((comment, index) => (
            <div key={index}> - {comment}</div>
          ))
        )}
        <form onSubmit={handleComment} className="comment-form">
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Add a comment"
            variant="outlined"
            className="input-comment"
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              fontSize: '20px',
              backgroundColor: '#5b95d6',
              height: '100%',
              marginLeft: '20px',
            }}
          >
            +
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Blog
