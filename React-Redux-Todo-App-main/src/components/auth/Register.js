import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../../css/style.css";
import Axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../misc/ErrorNotice";
import Cal from "../../images/cal2.jpg";
import constants from "../../constants/constants";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post(constants.backend_url + "/users/register", newUser);
      const loginRes = await Axios.post(
        constants.backend_url + "/users/login",
        {
          email,
          password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user-id", loginRes.data.user.id);
      localStorage.setItem("user-name", loginRes.data.user.displayName);
      history.push("/dashboard");
      window.location.reload();
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <div
        class="  p-3 mb-2  text-white "
        //   style={{ backgroundImage: `url(${bg2})` }}
      >
        <div
          class="container-lg  shadow p-3 mb-5  text-dark rounded-3  "
          style={{ marginTop: "5%", backgroundColor: "white" }}
        >
          <div class="row row-cols-2">
            <div class="col">
              <img src={Cal} class="img-thumbnail" alt="..."></img>
            </div>
            <div class="col">
              <div
                class="container-sm   p-3 mb-5 bg-body rounded bg-light text-dark "
                style={{ marginTop: "0%", height: "97.6%" }}
              >
                <div style={{ marginTop: "7%" }}>
                  <div class="mx-auto">
                    <h2>Sign Up</h2>
                  </div>
                  <p>Please Signup Before login to your Acount</p>
                  {error && (
                    <ErrorNotice
                      message={error}
                      clearError={() => setError(undefined)}
                    />
                  )}
                  <div>
                    <form onSubmit={submit}>
                      <div className="mb-2">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="register-email"
                          aria-describedby="emailHelp"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">User Name</label>
                        <input
                          type="text"
                          id="register-display-name"
                          className="form-control"
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="register-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Verify Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="Verify password"
                          onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-dark ml-150 px-5"
                        value="Register"
                      >
                        Sign Up
                      </button>
                    </form>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    //   <div className="page">
    //   <h2>Register</h2>
    //   {error && (
    //     <ErrorNotice message={error} clearError={() => setError(undefined)} />
    //   )}
    //   <form className="form" onSubmit={submit}>
    //     <label htmlFor="register-email">Email</label>
    //     <input
    //       id="register-email"
    //       type="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />

    //     <label htmlFor="register-password">Password</label>
    //     <input
    //       id="register-password"
    //       type="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Verify password"
    //       onChange={(e) => setPasswordCheck(e.target.value)}
    //     />

    //     <label htmlFor="register-display-name">Display name</label>
    //     <input
    //       id="register-display-name"
    //       type="text"
    //       onChange={(e) => setDisplayName(e.target.value)}
    //     />

    //     <input type="submit" value="Register" />
    //   </form>
    // </div>
  );
}
