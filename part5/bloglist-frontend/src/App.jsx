import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null)

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
        console.log("wrong credentials")
    }
  };

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
    
      {if (user === null ){
        return(
          <div>
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
        {<p>{`${user.username} logged in`} <button onClick={handleLogout}>logout</button></p>}
        { 
        blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      </div>
      )
      }
    
};

export default App;
