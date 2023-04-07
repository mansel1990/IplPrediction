import {
  EXPENSE_ADD_FAIL,
  EXPENSE_ADD_REQUEST,
  EXPENSE_ADD_SUCCESS,
  EXPENSE_SELECT,
  EXPENSE_SELECT_RESET,
  GET_EXPENSE_FAIL,
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
} from "../constants/expenseConstants";

export const expenseAddReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_ADD_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_ADD_SUCCESS:
      return {
        loading: false,
        success: "Expense Successfully Added",
      };
    case EXPENSE_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const expenseGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXPENSE_REQUEST:
      return {
        loading: true,
      };
    case GET_EXPENSE_SUCCESS:
      return {
        loading: false,
        expenseData: action.payload,
      };
    case GET_EXPENSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const selectExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_SELECT:
      return {
        selectedIcon: action.payload.selectedIcon,
        selectedCategory: action.payload.selectedCategory,
      };
    case EXPENSE_SELECT_RESET:
      return {
        selectedExpense: {},
      };
    default:
      return state;
  }
};
