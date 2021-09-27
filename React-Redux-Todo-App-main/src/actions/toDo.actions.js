import axios from "axios";
import constants from "../constants/constants";
import { toDoConstants } from "./constants";
import { toast } from "react-toastify";

//action to get all to do from database
export const getAllToDos = () => {
  return async (dispatch) => {
    dispatch({ type: toDoConstants.GET_ALL_TODO_REQUEST });

    const res = await axios.get(
      constants.backend_url +
      "/toDos/getAllToDos-all/" +
      localStorage.getItem("user-id")
    );

    if (res.status === 200) {
      dispatch({
        type: toDoConstants.GET_ALL_TODO_SUCCESS,
        payload: { toDoItems: res.data },
      });
    } else {
      dispatch({
        type: toDoConstants.GET_ALL_TODO_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

//action to add todo
export const addToDoItem = (toDoObj) => {
  return async (dispatch) => {
    dispatch({ type: toDoConstants.ADD_NEW_TODO_REQUEST });

    try {
      const res = await axios.post(
        constants.backend_url + "/toDos/add",
        toDoObj
      );
      if (res.status === 201) {
        dispatch({
          type: toDoConstants.ADD_NEW_TODO_SUCCESS,
          payload: { toDoItem: res.data.toDo },
        });
        dispatch(getAllToDos());

        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch({
          type: toDoConstants.ADD_NEW_TODO_FAILURE,
          payload: res.data.error,
        });

        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error.reponse);
    }
  };
};

//action to update todo
export const updateToDoItem = (toDoObj) => {
  return async (dispatch) => {
    dispatch({ type: toDoConstants.UPDATE_TODO_REQUEST });

    try {
      const res = await axios.post(
        constants.backend_url + "/toDos/update",
        toDoObj
      );
      if (res.status === 201) {
        dispatch({
          type: toDoConstants.UPDATE_TODO_SUCCESS,
          payload: { toDoItem: res.data.toDo },
        });
        dispatch(getAllToDos());

        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch({
          type: toDoConstants.UPDATE_TODO_FAILURE,
          payload: res.data.error,
        });

        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error.reponse);
    }
  };
};

//action to delete a to do
export const deleteToDo = (id) => {
  return async (dispatch) => {
    dispatch({ type: toDoConstants.DELETE_TODO_REQUEST });

    const res = await axios.delete(
      constants.backend_url + "/toDos/delete/" + id
    );

    if (res.status === 200) {
      dispatch(getAllToDos());
      dispatch({
        type: toDoConstants.DELETE_TODO_SUCCESS,
      });

      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: toDoConstants.DELETE_TODO_FAILURE,
        payload: { error },
      });

      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

//action to set status as complete a to do
export const setCompleteToDo = (id) => {
  return async (dispatch) => {
    dispatch({ type: toDoConstants.SET_COMPLETE_TODO_REQUEST });

    const res = await axios.get(
      constants.backend_url +
      "/toDos/markAsCompleted/" +
      localStorage.getItem("user-id") +
      "/" +
      id
    );

    if (res.status === 200) {
      dispatch(getAllToDos());
      dispatch({
        type: toDoConstants.SET_COMPLETE_TODO_SUCCESS,
      });

      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: toDoConstants.SET_COMPLETE_TODO_FAILURE,
        payload: { error },
      });

      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};
