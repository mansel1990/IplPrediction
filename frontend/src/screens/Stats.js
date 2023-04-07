import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { Col, Row } from "react-bootstrap";
import {
  getGraphData,
  getStartEndPoint,
  graphOptions,
} from "../constants/utils";
import { getExpense } from "../actions/expenseAction";
import { getGroupDetails } from "../actions/userAction";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { monthList } from "../constants/categoryList";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Stats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDays, setSelectedDays] = useState("");

  const [graphData, setGraphData] = useState(null);

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

  useEffect(() => {
    if (expenseData) {
      const reqData = Object.values(
        expenseData.reduce((hash, item) => {
          if (!hash[item.category]) {
            hash[item.category] = { category: item.category, amount: 0 };
          }
          hash[item.category].amount += item.amount;
          return hash;
        }, {})
      );
      const labels = reqData.map((e) => e.category);
      const amount = reqData.map((e) => e.amount);

      setGraphData(getGraphData(labels, amount));
    }
  }, [expenseData]);

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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {expenseData && (
            <Col md={6}>
              <h3>Expense Chart</h3>
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
              {graphData && <Pie data={graphData} options={graphOptions} />}
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default Stats;
