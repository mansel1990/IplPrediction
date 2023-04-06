import {
  EXPENSE_ADD_FAIL,
  EXPENSE_ADD_REQUEST,
  EXPENSE_ADD_SUCCESS,
  GET_EXPENSE_FAIL,
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
} from "../constants/expenseConstants";
import axios from "axios";

export const addExpense =
  (name, amount, category, date) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EXPENSE_ADD_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/expense",
        {
          name,
          amount,
          category,
          date,
        },
        config
      );

      dispatch({
        type: EXPENSE_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXPENSE_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getExpense = async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EXPENSE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/expense", config);

    dispatch({
      type: GET_EXPENSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
