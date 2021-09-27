import React, { useEffect, useState } from "react";
import DisplayTodos from "../components/DisplayTodos";
import Todos from "../components/Todos";
import { useHistory } from "react-router-dom";
import "../css/main.css";

import { motion } from "framer-motion";

const Dashboard = () => {
  const [displayName, setDisplayName] = useState(localStorage.getItem("user-name"));
  const history = useHistory();


  useEffect(()=>{
    if (localStorage.getItem("auth-token") == "") {
      history.push("/");
    } else {
      console.log("User logged in");
    }
  },[])
  return (
    <div className="App">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        Welcome to ToDo-App<br /> {displayName}
      </motion.h1>
      <br />
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos />
        <DisplayTodos />
      </motion.div>
    </div>
  );
};

export default Dashboard;
