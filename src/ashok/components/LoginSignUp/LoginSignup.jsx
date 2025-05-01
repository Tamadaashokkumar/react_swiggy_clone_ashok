import React, { useState } from "react";
import { url } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./style.css"; // Import the CSS file

const LoginSignUp = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const successToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000, // closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRegister = (msg) => {
    // Simulate a registration failure
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Submit the form using async/await
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    console.log("this page is runnig why");

    const form = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };

    try {
      const Url = isLogin ? `${url}/user/login` : `${url}/user/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      };
      const response = await fetch(Url, options);
      const data = await response.json();
      setResponseMessage(data.message);
      console.log(data);
      if (response.ok) {
        if (isLogin) {
          successToast(data.message);
          Cookies.set("token", data.token, { expires: 7 });
          Cookies.set("id", data.userId, { expires: 7 });
          setTimeout(() => navigate("/"), 2000);
        } else {
          successToast(data.message);
          setIsLogin(true);
        }
      } else {
        handleRegister(data.message);
      }
    } catch (error) {
      setResponseMessage("Something went wrong. Please try again.");
      isLogin
        ? handleRegister("Login Failed")
        : handleRegister("Registration Failed");
    } finally {
      setLoading(false);
      setFormData({ username: "", email: "", password: "" });
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <h2 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="auth-input"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-inputs"
            required
          />
          <button
            type="button"
            className="passwordButton"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Show response message */}
      {responseMessage && (
        <p className="response-message mt-3 mb-3 text-info font-weight-bold">
          {responseMessage}
        </p>
      )}

      {/* Toggle between Login and Signup */}
      <p className="auth-toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="submit"
          onClick={() => setIsLogin(!isLogin)}
          className="auth-toggle-button"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};
export default LoginSignUp;
