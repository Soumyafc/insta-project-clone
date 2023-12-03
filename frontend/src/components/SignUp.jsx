import React, { useState } from "react";
import logo from "../img/logo.png";
import "./signup.css";
import { Link , useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { localhosturl } from "../../awsbackendkey";

function SignUp() {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    //checking email
    
    if (!emailRegex.test(email)) {
      notifyA("Invalid email")
      return
    } else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
      return
    }

    // Sending data to server
    fetch(localhosturl+"/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message)
          navigate("/signin")
        }
        
      })
  }
  return (
    <div className="signup">
      <div className="form-container">
        <img className="signuplogo" src={logo} alt="" />
        <p className="loginpara">
          Sign up to see photos and videos <br /> from your friends
        </p>

        <div>
          <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}/>
        </div>
        <div>
          <input type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={((e) => { setName(e.target.value) })} />
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={userName}
              onChange={(e) => { setUserName(e.target.value) }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
              onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <p className="loginpara two">
          By signing up, you agree to out Terms, <br /> privacy policy and
          cookies policy.
        </p>
        <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }}/>
        <div className="form2">
          Already have an account?{" "}
          <Link to="/signin">
            {" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              Sign In
            </span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
