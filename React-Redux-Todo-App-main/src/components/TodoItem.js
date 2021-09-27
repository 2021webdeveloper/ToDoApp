import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import "../css/main.css";
import { useDispatch } from "react-redux";
import { deleteToDo, setCompleteToDo, updateToDoItem } from "../actions";
import { Modal, Button } from "react-bootstrap";

const TodoItem = (props) => {
  const { item } = props;

  const [title, setTitle] = useState(item.title);
  const [taskDescription, setTaskDescription] = useState(item.taskDescription);
  const [priority, setPriority] = useState(item.priority);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const deleteToDoItem = (id) => {
    dispatch(deleteToDo(id));
  };

  const setNewStatus = (id) => {
    dispatch(setCompleteToDo(id));
  };

  const updateToDo = () => {
    const toDoObj = {
      _id: item._id,
      user_id: item.user_id._id,
      title: title,
      status: item.status,
      taskDescription: taskDescription,
      assignedDate: item.assignedDate,
      assignedTime: item.assignedTime,
      priority: priority,
    };
    dispatch(updateToDoItem(toDoObj));
  };

  const renderUpdateToDoModal = () => {
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
              <option selected value={item.priority}>
                {item.priority}
              </option>
              <option value="High">High</option>
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
              updateToDo();
              handleClose();
            }}
          >
            Update To Do
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.li
      className="container card"
      variants={container}
      initial="hidden"
      animate="visible"
      key={item._id}
    >
      <h5 style={{ color: "#271c6c" }}>{item.title}</h5>
      <br />
      <p style={{ color: "#271c6c" }}>{item.taskDescription}</p>
      <br />
      <p style={{ color: "#271c6c" }}>
        {item.assignedDate.split("T")[0]} | {item.assignedTime}{" "}
      </p>
      <br />
      <p style={{ color: "#271c6c" }}>Priority : {item.priority} </p>
      <br />
      <p style={{ color: "#271c6c" }}>User Name : {item.userName} </p>
      <br />
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            handleShow();
          }}
        >
          {" "}
          <AiFillEdit />{" "}
        </motion.button>
        {item.status === "Active" && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => setNewStatus(item._id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => deleteToDoItem(item._id)}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.status === "Completed" && <span className="completed">done</span>}
      {renderUpdateToDoModal()}
    </motion.li>
  );
};

export default TodoItem;
