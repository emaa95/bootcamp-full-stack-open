import { useState } from 'react'
import { Card, Button, TextField } from '@mui/material'
import './Blog.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog, commentBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

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
        <h1>{blog.title}</h1> <p>{blog.url}</p>
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
        <h4>Comments</h4>
        {blog.comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          blog.comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))
        )}
        <form onSubmit={handleComment} className="comment-form">
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Add a comment"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Blog
