import { toDoConstants } from "../actions/constants";

const initialState = {
  toDoItems: [],
  loading: false,
  error: null,
};

const buildNewToDos = (toDoItems, toDoItem) => {
  return [
    ...toDoItems,
    {
      _id: toDoItem._id,
      user_id: toDoItem.user_id,
      title: toDoItem.title,
      status: toDoItem.status,
      taskDescription: toDoItem.taskDescription,
      assignedDate: toDoItem.assignedDate,
      assignedTime: toDoItem.assignedTime,
      priority: toDoItem.v,
    },
  ];
};

export default (state = initialState, action) => {
  switch (action.type) {
    case toDoConstants.GET_ALL_TODO_SUCCESS:
      state = {
        ...state,
        toDoItems: action.payload.toDoItems,
        loading: false,
      };
      break;
    case toDoConstants.ADD_NEW_TODO_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case toDoConstants.ADD_NEW_TODO_SUCCESS:
      const toDoItem = action.payload.toDoItem;
      const updatedtoDoItems = buildNewToDos(state.toDoItems, toDoItem);

      state = {
        ...state,
        toDoItems: updatedtoDoItems,
        loading: false,
      };
      break;
    case toDoConstants.UPDATE_TODO_REQUEST:
      state = { ...state, loading: true };
      break;
    case toDoConstants.UPDATE_TODO_SUCCESS:
      state = { ...state, loading: false };
      break;
    case toDoConstants.UPDATE_TODO_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    case toDoConstants.DELETE_TODO_REQUEST:
      state = { ...state, loading: true };
      break;
    case toDoConstants.DELETE_TODO_SUCCESS:
      state = { ...state, loading: false };
      break;
    case toDoConstants.DELETE_TODO_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    case toDoConstants.SET_COMPLETE_TODO_REQUEST:
      state = { ...state, loading: true };
      break;
    case toDoConstants.SET_COMPLETE_TODO_SUCCESS:
      state = { ...state, loading: false };
      break;
    case toDoConstants.SET_COMPLETE_TODO_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
  }
  return state;
};
