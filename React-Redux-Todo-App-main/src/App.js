import "./css/main.css";
import React, { useState, useEffect } from "react";
import DisplayTodos from "./components/DisplayTodos";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import constants from "./constants/constants";
import Axios from "axios";
import Todos from "./components/Todos";
import Navbar from "./components/nav/Navbar";
import { motion } from "framer-motion";
import UserContext from "./context/userContext";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";
import { getAllToDos } from "./actions";
import { useDispatch } from "react-redux";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        constants.backend_url + "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get(constants.backend_url + "/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
        dispatch(getAllToDos());
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
