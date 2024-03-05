import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { MailLockOutlined, Face2Sharp, LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/slice/login";
import { userSignUp } from "../../Redux/slice/signUp";
import Loading from '../../components/layout/Loading/Loading'
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
function LoginSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isError, isLoading, errorMessage } = useSelector((state) => state.userLogin);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: loginEmail,
      password: loginPassword,
    };

    dispatch(userLogin(body));
  };

  useEffect(() => {
    
  }, [errorMessage, navigate, token]);

  function registerSubmit(e) {
    e.preventDefault();

    console.log(name, email, password);

    const body = {
      name,
      email,
      password,
      avatar,
    };
    dispatch(userSignUp(body));
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      {isError && <Alert message={isError} color="error" />}

      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            {token && (
              <Alert
                message={"You have logged successfully👍 "}
                color={"success"}
              />
            )}
          </div>
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "register")}>Registration</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailLockOutlined />
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="loginPassword">
              <LockOpen />
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            action=""
            className="signUpForm"
            ref={registerTab}
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <Face2Sharp />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="loginEmail">
              <MailLockOutlined />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="loginPassword">
              <LockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
        {isLoading ? <Loading /> : <input type="submit" value="Register" className="signUpBtn" />}    
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginSignUp;
