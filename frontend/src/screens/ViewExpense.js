import { useEffect, useCallback, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getExpense } from "../actions/expenseAction";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { columns } from "../constants/expenseDataColumn";
import { monthList } from "../constants/categoryList";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BudgetCard from "../components/BudgetCard";
import { Col, Row } from "react-bootstrap";
import { getGroupDetails } from "../actions/userAction";
import { getStartEndPoint } from "../constants/utils";

const ViewExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());

  const [selectedDays, setSelectedDays] = useState("");

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const expense = useSelector((state) => state.expenseGet);
  const { expenseData, loading } = expense;

  const group = useSelector((state) => state.getGroupDetails);
  const { groupDetails } = group;
  let monthStart = 1,
    startPoint = "",
    endPoint = "";
  if (groupDetails) {
    monthStart = groupDetails.startDate;
    const dateDetailsObj = getStartEndPoint(monthStart);
    startPoint = dateDetailsObj.startPoint;
    endPoint = dateDetailsObj.endPoint;
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getGroupDetails);
      dispatch(getExpense());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const onEdit = useCallback(async (newRow, oldRow) => {
    return newRow;
  }, []);

  const handleProcessRowUpdateError = useCallback((error) => {
    console.log(error);
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);

    const { startPoint, endPoint } = getStartEndPoint(
      monthStart,
      selectedMonth
    );
    setSelectedDays(startPoint + " to " + endPoint);
    dispatch(getExpense(selectedMonth));
  };

  return (
    <>
      <Row className="mt-3">
        <Col sm={12} md={4}>
          <BudgetCard name="budget" />
        </Col>
        <Col sm={12} md={4}>
          <BudgetCard name="expense" />
        </Col>
        <Col sm={12} md={4}>
          <BudgetCard name="remaining" />
        </Col>
      </Row>
      <div className="month-select-div">
        <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={handleMonthChange}
            label="Month"
          >
            {monthList.map((element, index) => (
              <MenuItem key={index} value={index}>
                {element}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="px-4">
          {selectedDays ? selectedDays : startPoint + " to " + endPoint}
        </div>
      </div>
      <div style={{ height: "60vh", width: "100%" }}>
        {loading ? (
          <Loader />
        ) : (
          <DataGrid
            rows={expenseData ? expenseData : []}
            columns={columns}
            getRowId={(row) => row.expense_id}
            autoPageSize
            processRowUpdate={onEdit}
            onProcessRowUpdateError={handleProcessRowUpdateError}
          />
        )}
      </div>
    </>
  );
};

export default ViewExpense;
