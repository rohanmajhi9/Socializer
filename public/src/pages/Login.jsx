import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import bgi from "../assets/bg.png"
import landing from "../assets/landing.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

// Login
const Login = () => {
  const navigate = useNavigate();

  // form initial state
  const initialState = {
    email: "",
    password: "",
  };

  // Show toast error msg
  const showToast = (msg) => {
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    return toast.error(msg, toastOptions);
  };

  const [values, setValues] = useState(initialState);

  // Check if user is logged in
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_CHAT_APP_USER))
      return navigate("/");
  }, []); // eslint-disable-line

  // handle form Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reload of page

    // handle Validation
    if (handleValidation()) {
      const { email, password } = values;

      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (!data.status) showToast(data.msg);

      // Success
      if (data.status) {
        localStorage.setItem(
          process.env.REACT_APP_CHAT_APP_USER,
          JSON.stringify(data.user)
        );
        return navigate("/");
      }
    }
  };

  // handle form Validation
  const handleValidation = () => {
    const { email, password } = values;

    // Email validation
    const isInvalidEmail = (email) => {
      const regex = new RegExp( // eslint-disable-next-line
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      return !email || regex.test(email) === false;
    };

    if (isInvalidEmail(email) || password.length < 3 || /\s/.test(password)) {
      showToast("E-mail and Password are required.");
      return false;
    }
    return true;
  };

  // handle form change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <div className="logo">
          <img className="limg" src={landing} alt="socializer" />
          <img className="img" src={bgi} alt="img" />
        </div>
        <div className="form">
        <form
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        >
          <div className="brand">
            <h1>Login</h1>
          </div>

          {/* E-mail */}
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form> 
        </div>
        <div className="footer">
          XYZ
        </div>
      </FormContainer>
    </>
  );
};


// Form Container
const FormContainer = styled.div`
  
  clear: both;
  height: 100vh;
  widhth: 90vh;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #fff;

  .logo{
    position:fixed;
    top:1vw;
    bottom:0ch;
    width: 55vw;
    float: left;
    
  }
  .img {
    height: 70%;
    width: 70%;
    align-items: center;
  }
  .logo .limg{
    gap: 1ch;
    justify-content: center;
    height: 30%;
    width: 90%;
    
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  img {
    height: 5rem;
    align: left;
  }

  .form{
    position:fixed;
    height: 100%;
    left:50%;
    width: 50vw;
    padding: 5ch;
    float: right;
    background-color: #122D42;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
  }

  form {
    align: right;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: #FFFFFF;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #FBF9FA;
      color: black;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: #997af0;
        color: #fff
      }
    }

    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

  .footer {
    background-color: darkgray;
    color: darkgray;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;

  }
`;

export default Login;
