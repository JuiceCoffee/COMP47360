//import React from 'react';
import React, { useContext, useState } from "react";
import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import './App.css';
import backgroundImage from './nyc.jpg'; // Replace 'your_background_image.jpg' with the actual filename of your image
//import {useCookies} from `react-cookie`

function App({ navigation, route, props }) {

  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

//http-only cookie
//  const [toten, setToken] = useCookies(['mytoken'])

  function handleLogin(email, password) {
    setError("");
    axios
      .post(`http://127.0.0.1:8000/api/user/token/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        // setUserInfo(userInfo);
        //AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo)
        // setIsLoading(false);
        // navigation.navigate("Discover");
      })
      .catch((e) => {
        //console.log(`login error ${e}`);
        // setIsLoading(false);
      });
  }







  
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInputChangePass = (event) => {
    setPassword(event.target.value);
  };


  const handleButtonClick = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };


  return (
    <div
    className="App"
    style={{
      marginTop: '20vh',
      //backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
      width: '100%', 
      height: '100vh', 
    }}
  >
      <div className="container">
      {/* Image */}
      <div style={{ textAlign: 'center' }}>
          <img src="/homeImage.png" alt="Image" style={{ width: '200px', height: '200px' }} />
        </div>

        <h1>Login</h1>
        {/* textbox */}
        <div style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ margin: '10px', marginLeft: '0px', width: '100%' }}/>
          <input type="text" value={password} onChange={(event2) => setPassword(event2.target.value)} placeholder="Password" style={{ margin: '10px', marginLeft: '0px', width: '100%' }} />

          <div style={{ textAlign: 'left', fontSize: '12px'}}>
            <p>Don't have an account? <a>Sign up</a></p> 
            <p>Forgot password? <a>Reset password</a></p> 
          </div>
        
        {/* Button */}
          <div style={{ textAlign: 'center', width: '70%', margin: '0 auto', marginTop: '25px',margin: '25px' }}>
            <button button type="button" onClick={() => handleLogin(email, password)}>Login</button>
            {/* <button button type="button" onClick={() => console.log(email, password)}>Login</button> */}
          </div>
        </div>

      </div>
    </div>
    

  );
}

export default App;
