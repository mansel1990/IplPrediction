import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, resetSelection } from "../actions/expenseAction";
import { categoryList } from "../constants/categoryList";

const AddExpenseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const vertical = "top",
    horizontal = "center";

  const expenseAdd = useSelector((state) => state.expenseAdd);
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
  } = expenseAdd;

  const selectedExpense = useSelector((state) => state.selectedExpense);
  const { selectedIcon, selectedCategory } = selectedExpense;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (successAdd) {
      dispatch(resetSelection);
      setOpen(true);
      setName("");
      setAmount("");
      setCategory(null);
    }
  }, [successAdd, dispatch]);

  useEffect(() => {
    if (selectedIcon && selectedCategory) {
      setName(selectedIcon);
      setCategory(selectedCategory);
    }
  }, [selectedIcon, selectedCategory]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !amount || !category || !date) {
      setMessage("Please enter values for all fields");
    } else {
      setMessage("");
      dispatch(
        addExpense(name, amount, category, date.toLocaleDateString("ja-JP"))
      );
    }
  };

  return (
    <div>
      <Row>{message && <Message variant="danger">{message}</Message>}</Row>
      {errorAdd && <Message variant="danger">{errorAdd}</Message>}
      {successAdd && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successAdd}
          </Alert>
        </Snackbar>
      )}
      {loadingAdd ? (
        <Loader />
      ) : (
        <Row className="form-row">
          <Col sm={10} lg={10} md={10} className="mt-3 mt-md-0">
            <Row className="form-row">
              <Col sm={8} lg={8} md={8} className="mt-3 mt-md-0">
                <FormControl className="form-field">
                  <TextField
                    required
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="standard"
                  />
                </FormControl>
              </Col>
              <Col sm={4} lg={4} md={4} className="mt-3 mt-md-0">
                <FormControl variant="standard" className="form-field">
                  <InputLabel required htmlFor="adornment-amount">
                    Amount
                  </InputLabel>
                  <Input
                    id="adornment-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">₹</InputAdornment>
                    }
                  />
                </FormControl>
              </Col>
            </Row>
            <Row className="form-row mt-md-3">
              <Col sm={8} lg={8} md={8} className="mt-3 mt-md-0">
                <FormControl className="form-field">
                  <Autocomplete
                    id="auto-combo"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    options={categoryList}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Category"
                        required
                      />
                    )}
                    value={category}
                    onChange={(event, newValue) => {
                      setCategory(newValue);
                    }}
                  />
                </FormControl>
              </Col>
              <Col
                sm={4}
                lg={4}
                md={4}
                className="mt-4 mt-md-0 date-picker-col"
              >
                <FormControl className="form-field date-picker-div">
                  <DatePicker
                    showIcon
                    selected={date}
                    onChange={(date, formatedDate) => setDate(date)}
                    className="date-picker-cls"
                  />
                </FormControl>
              </Col>
            </Row>
          </Col>
          <Col sm={2} md={2} lg={2} className="form-btn-col">
            <button
              type="button"
              className="btn btn-outline-primary mt-4 mt-md-0 form-btn"
              onClick={submitHandler}
            >
              Add
            </button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AddExpenseForm;
