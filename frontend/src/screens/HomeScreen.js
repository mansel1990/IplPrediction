import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getGroupDetails } from "../actions/userAction";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import Loader from "../components/Loader";
import BudgetCard from "../components/BudgetCard";
import { getExpense } from "../actions/expenseAction";

import ShopIcons from "../components/ShopIcons";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const group = useSelector((state) => state.getGroupDetails);
  const { loading, groupDetails } = group;
  let groupId = null;
  if (groupDetails) {
    groupId = groupDetails.groupId;
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getGroupDetails);
      dispatch(getExpense());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const onCreateGroup = () => {
    navigate("/groups");
  };

  return loading ? (
    <Loader />
  ) : groupId ? (
    <div>
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
      <Row className="mt-3">
        <Col>
          <AddExpenseForm />
        </Col>
      </Row>
      <ShopIcons />
    </div>
  ) : (
    <div className="mt-4">
      <h6>You are not a part of any group!!!</h6>
      <h6 className="mt-3">
        Please create your budget group and track your expenses
      </h6>
      <Button variant="primary" className="my-3" onClick={onCreateGroup}>
        Create group
      </Button>
    </div>
  );
};

export default HomeScreen;
