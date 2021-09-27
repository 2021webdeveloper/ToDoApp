import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import "../css/main.css";
import { useSelector } from "react-redux";

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");

  const toDoItems = useSelector((state) => state.toDoItems.toDoItems);

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {toDoItems.length > 0 && sort === "active"
            ? toDoItems.map((item) => {
                return item.status === "Active" ? (
                  <TodoItem key={item._id} item={item} />
                ) : null;
              })
            : null}
          {/* for completed items */}
          {toDoItems.length > 0 && sort === "completed"
            ? toDoItems.map((item) => {
                return item.status === "Completed" ? (
                  <TodoItem key={item._id} item={item} />
                ) : null;
              })
            : null}
          {/* for all items */}
          {toDoItems.length > 0 && sort === "all"
            ? toDoItems.map((item) => {
                return <TodoItem key={item._id} item={item} />;
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
