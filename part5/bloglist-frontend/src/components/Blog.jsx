import { useState } from "react"

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

  if (blogVisible === false) {
  return(
  <div style={blogStyle}>
  <div style={hideWhenVisible}>
    {blog.title} <button onClick={() => setBlogVisible(true)}>view</button>
  </div> 
  </div>
  ) 
  } else {
    return(
      <div style={blogStyle}>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={() => setBlogVisible(false)}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.author}</p>
      </div>
      </div>
    )
  }
}

export default Blog