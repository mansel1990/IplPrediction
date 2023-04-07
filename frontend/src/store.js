import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createGroupReducer,
  getAllUsersReducer,
  getGroupDetailsReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  expenseAddReducer,
  expenseGetReducer,
  selectExpenseReducer,
} from "./reducers/expenseReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  expenseAdd: expenseAddReducer,
  expenseGet: expenseGetReducer,
  getAllUsers: getAllUsersReducer,
  createGroup: createGroupReducer,
  getGroupDetails: getGroupDetailsReducer,
  selectedExpense: selectExpenseReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
