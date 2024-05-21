import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login"
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (e) {
        setErrorMessage('Wrong credentials...')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  };

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setSuccessMessage(`${newTitle} was created successfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }
      {if (user === null ){
        return(
          
          <div>
          <Notification error={errorMessage}/>
          <form onSubmit={handleLogin}>
            <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
        </div>{" "}
        <button type="submit">login</button>{" "}
      </form>
      </div>
        )
      }
      return(
        <div>
        <h2>blogs</h2>
        <Notification success={succesMessage}/>
        {<p>{`${user.username} logged in`} <button onClick={handleLogout}>logout</button></p>}
        <h3>create new</h3>
        <form onSubmit={addBlog}>
          <div>
          title
            <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
          author
            <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
          url
            <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>{" "}
        </form>
        { 
        blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      </div>
      )
      }
    
};

export default App;
