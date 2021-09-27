import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import "../css/main.css";
import { useDispatch } from "react-redux";
import { addToDoItem } from "../actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

const Todos = (props) => {
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const addNewToDo = () => {
    let today = new Date();
    const toDoObj = {
      user_id: localStorage.getItem("user-id"),
      title: title,
      status: "Active",
      taskDescription: taskDescription,
      assignedDate: today,
      assignedTime: Number(today.getHours() + "." + today.getMinutes()),
      priority: priority,
      userName: localStorage.getItem("user-name")
    };
    dispatch(addToDoItem(toDoObj));
    setTitle("");
    setTaskDescription("");
    setPriority("High");
  };

  const renderAddToDoModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Task Description
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="slc" className="form-label">
              Priority
            </label>
            <select
              id="slc"
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option selected value="High">
                High
              </option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addNewToDo();
              handleClose();
            }}
          >
            Add To Do
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="addTodos">
      <ToastContainer />
      {/* <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      /> */}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        //onClick={() => addNewToDo()}
        onClick={handleShow}
      >
        <GoPlus />
      </motion.button>
      <br />
      {renderAddToDoModal()}
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default Todos;
