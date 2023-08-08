import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(email, password) {
    setError("");
    axios
      .post(`http://127.0.0.1:8000/api/user/token/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo);
        navigate("/Map");
      })
      .catch((error) => {
        setError("Invalid credentials. Please try again.");
        console.error("login error", error);
      });
  }

  const handleSignUpClick = () => {
    navigate("/Register"); // Navigate to the Register page
  };

  return (
    <div
      className="App"
      style={{
        marginTop: "20vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="container">
        {/* Image */}
        <div style={{ textAlign: "center" }}>
          <img
            src="./assets/icons/homeImage.png"
            alt="Image"
            style={{ width: "200px", height: "200px" }}
          />
          <h1>Login</h1>
        </div>

        {/* Textbox */}
        <div
          style={{
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            style={{ margin: "10px", marginLeft: "0px", width: "100%" }}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            style={{ margin: "10px", marginLeft: "0px", width: "100%" }}
          />

          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
            }}
          >
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={handleSignUpClick}>
                Sign up
              </a>
            </p>
            <p>
              Forgot password? <a href="#">Reset password</a>
            </p>
          </div>

          {/* Button */}
          <div
            style={{
              textAlign: "center",
              width: "70%",
              margin: "0 auto",
              marginTop: "25px",
              marginBottom: "25px",
            }}
          >
            <button type="button" onClick={() => handleLogin(email, password)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}