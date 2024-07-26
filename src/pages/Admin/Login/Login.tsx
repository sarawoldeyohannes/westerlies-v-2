import "./Login.css";
import logo from "../../../assets/westerliesLogoblue.png";
import { LoginData, login } from "./controller.login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: LoginData = {
      username: username,
      password: password,
    };

    try {
      const response: any = await login(data);
      if (response && response.status === 201) {
        setSuccessMessage(`Login successful`);
        setTimeout(async () => {
          setSuccessMessage("");
          await Promise.all([
            localStorage.setItem("authToken", response.data.token),
            localStorage.setItem("isAuthenticated", "true"),
          ]);

          navigate("/AdminHome");
        }, 2000);
        // Set items in localStorage and wait for it to complete
      } else {
        setErrorMessage(`Username or Password is wrong`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      // Handle network error or other issues
    }
  };
  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration) {
      const expirationTime = new Date(tokenExpiration).getTime();
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        // Token has expired, log out the user
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    }
  }, []);

  return (
    <div className="login-page">
      <div className="center">
        {/* Error message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <img src={logo}></img>
        <form onSubmit={handleLogin}>
          <div className="txt_field">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};
export default Login;
