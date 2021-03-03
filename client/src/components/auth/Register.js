import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";


export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  


  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck};
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  
  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          autoCorrect="off"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="register-password">Password Again</label>
        <input
          type="password"
          autoComplete="off"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        

        <input type="submit" value="Register" />
      </form>
      <div>
        <label>Already have an account? </label>
      <Link to="/login">Log in</Link>
      </div>

     

      
    </div>
  );
}
