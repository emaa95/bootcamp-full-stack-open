import { useState } from "react";
import loginService from "../services/login";
import Notification from "../components/Notification";

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const user = await loginService.login({username, password});
          handleLogin(user)
          setUsername("");
          setPassword("");
        } catch (error) {
          setErrorMessage("Wrong credentials...");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      };
    
      return (
        <div>
          <Notification error={errorMessage} />
          <form onSubmit={handleLoginFormSubmit}>
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
      );
    };


export default LoginForm