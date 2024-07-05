import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsSortedLike = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="div-gallery">
      {blogsSortedLike.map((blog) => (
        <div key={blog.id} className="blog-item">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList