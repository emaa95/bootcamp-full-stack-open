import { Card, Button } from "@mui/material"
import { useState } from "react"
import './Blog.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Blog = ({ blog, addLike, deleteBlog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLike(blog.id, blogObject)
  }

  const handleRemove = () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
          deleteBlog(blog.id)
      }
  }

  if (blogVisible === false) {
  return(
  
  <div style={hideWhenVisible} className="div-card">
  <Card className="card">
    <h1>{blog.title}</h1> <Button variant='contained' onClick={() => setBlogVisible(true)} endIcon={<VisibilityIcon></VisibilityIcon>} sx={{backgroundColor:'#5b95d6'}}>view</Button>
  </Card>
   
  </div> 
  
  ) 
  } else {
    return(
      <div style={showWhenVisible} className="div-card2">
        <Card className="card">
        <h1>{blog.title}</h1> <Button onClick={() => setBlogVisible(false)} variant='contained' endIcon={<VisibilityOffIcon/>} sx={{backgroundColor:'#5b95d6'}}>hide</Button>
        <p>{blog.url}</p>
      
        <p>{blog.author}</p>
        <p>{blog.likes}</p>
        <div className="div-buttons">
        <Button onClick={handleLike} variant='contained' className="button like-button">
          <FavoriteIcon className="heart-icon"/>
        </Button>
        <Button onClick={handleRemove} variant='contained' className="button">
          <DeleteIcon />
        </Button>
        </div>
        </Card>
      </div>
  
    )
  }
}

export default Blog