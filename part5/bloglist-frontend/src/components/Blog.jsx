import { useState } from "react"

const Blog = ({ blog }) => {
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
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>
      </div>
    )
  }
}

export default Blog