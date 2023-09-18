import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

// Register
const Register = () => {
  const navigate = useNavigate();

  // form initial state
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Show toast error message
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

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_CHAT_APP_USER))
      return navigate("/");
  }, []); // eslint-disable-line

  // handle form Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reload of page
    if (handleValidation()) {
      const { username, email, password } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (!data.status) showToast(data.msg);

      // Registration success
      if (data.status) {
        localStorage.setItem(
          process.env.REACT_APP_CHAT_APP_USER,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  // handle validation
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    // Check if string is empty or contains whitespaces
    const isEmptyOrSpaces = (str) => {
      return /^\s*$/.test(str);
    };

    // email validation
    const isInvalidEmail = (email) => {
      const regex = new RegExp( // eslint-disable-next-line
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      return !email || regex.test(email) === false;
    };

    // vaidate username
    if (isEmptyOrSpaces(username)) {
      showToast("Username should be greater than 3 characters.");
      return false;
    }

    // validate email
    if (isInvalidEmail(email)) {
      showToast("Invalid Email.");
      return false;
    }

    // validate password
    if (/\s/.test(password)) {
      showToast("Password should not contain spaces.");
      return false;
    }

    if (password.length < 8) {
      showToast("Password should be equal or greater than 8 characters.");
      return false;
    }

    // validate confirm password
    if (password !== confirmPassword) {
      showToast("Password and confirm password should be same.");
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
        <form
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        >
          <div className="brand">
            <img src={Logo} alt="socializer" />
            <h1>socializer</h1>
          </div>
          {/* Your Name */}
          <h4>REGISTER</h4>
          <input
            type="text"
            placeholder="Your Name"
            name="username"
            onChange={(e) => handleChange(e)}
          />

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

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer />
    </>
  );
};

// Styled Components
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #FBF9FA;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  img {
    height: 5rem;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
  }

  
  form {
    display: flex;
    flex-direction: column;
    gap: 2ch;
    background-color: #525D68;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: #F0EAED;
      padding: 1rem;
      border: 0.1rem solid darkgray;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid black;
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
        color:#fff;
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
`;

export default Register;
