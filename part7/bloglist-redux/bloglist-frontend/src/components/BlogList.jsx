import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsSortedLike = [...blogs].sort((a, b) => b.likes > a.likes)

  return (
    <div className="div-galery">
      {blogsSortedLike.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
