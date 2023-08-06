import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";


export default function Login() {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  function handleRegister(name, email, password) {
    axios
      .post(`http://127.0.0.1:8000/api/user/create/`, {
        name,
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
        console.error("register  error", error);
      });
  }

  const handleButtonClick = () => {
    console.log("UserName:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };



  function handleBackClick() {
      window.history.back();
  }
  


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

      <button className="back-btn" onClick={() => handleBackClick()}>
        <img src="./assets/icons/back-button.png" style={{ height: "30px", width: "30px" }}></img>
      </button>

        {/* Image */}
        <div style={{ textAlign: "center" }}>
        <h1>NYC Explorer</h1>
          <img
            src="./assets/icons/homeImage.png"
            alt="Image"
            style={{ width: "200px", height: "200px" }}
          />
          <h2>Register</h2>
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
            value={name}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="User Name"
            style={{ margin: "10px", marginLeft: "0px", width: "100%", borderRadius: "5px", height: "20px"}}
          />
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            style={{ margin: "10px", marginLeft: "0px", width: "100%", borderRadius: "5px", height: "20px"}}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            style={{ margin: "10px", marginLeft: "0px", width: "100%", borderRadius: "5px", height: "20px"}}
          />

          {/* <div
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
          </div> */}

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
            <button
                type="button"
                onClick={() => handleRegister(name, email, password)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                }}
                  >
                    Register
              </button>












          </div>
        </div>
      </div>
    </div>
  );
}
