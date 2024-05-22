import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = (loggedInUser) => {
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(loggedInUser));
    blogService.setToken(loggedInUser.token);
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`${blogObject.title} was created successfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }
  return (
    <div>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification success={successMessage} />
          <p>
            {`${user.username} logged in`}{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <h3>create new</h3>
          <Togglable buttonLabel="create">
          <BlogForm
            createBlog={addBlog}
          />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
