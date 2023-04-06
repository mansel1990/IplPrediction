import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

import UserIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Autocomplete,
  FormControl,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import { Row, Col, Button } from "react-bootstrap";
import { createGroup, getAllUsers } from "../actions/userAction";

const Groups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [budget, setBudget] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const allUsersState = useSelector((state) => state.getAllUsers);
  const { allUsers, loading } = allUsersState;

  const groupStatus = useSelector((state) => state.createGroup);
  const { success, loading: groupLoading } = groupStatus;

  useEffect(() => {
    if (userInfo) {
      dispatch(getAllUsers);
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  useEffect(() => {
    if (allUsers && userInfo) {
      let userArray = [];
      allUsers.forEach((u) => {
        userArray.push(u.name);
      });
      setUserList(userArray);
      const userArr = [];
      const user = allUsers.find((a) => a.name === userInfo.name);
      if (user) {
        userArr.push(user);
      }

      setSelectedUserList(userArr);
    }
  }, [allUsers, userInfo]);

  useEffect(() => {
    if (success) {
      navigate(redirect);
    }
  }, [success, navigate, redirect]);

  const addUser = () => {
    if (!selectedUser) {
      setError("Please select user to add");
    } else if (
      selectedUserList.findIndex((a) => a.name === selectedUser) >= 0
    ) {
      setError("User already present on the list");
    } else if (selectedUser && allUsers) {
      setError("");
      const arr = [...selectedUserList];
      arr.push(allUsers.find((user) => user.name === selectedUser));
      setSelectedUserList(arr);
    }
  };

  const deleteUser = (e) => {
    const deleteId = e.currentTarget.getAttribute("itemkey");

    const newList = [...selectedUserList];
    newList.splice(
      newList.findIndex((a) => a.id === Number(deleteId)),
      1
    );
    setSelectedUserList(newList);
  };

  const onCreateGroup = () => {
    if (!groupName || !startDate || !budget) {
      setError(
        "Please enter values for name, start date and budget. Start date is the date of the month when you want the budget month to start."
      );
    } else if (startDate < 1 || startDate > 28) {
      setError("Start date should be between 1 and 28");
    } else {
      setError("");
      const seletedUserIds = selectedUserList.map((e) => e.id).toString();
      const groupObject = {
        groupName,
        startDate,
        seletedUserIds,
        budget,
      };
      dispatch(createGroup(groupObject));
    }
  };

  return loading || groupLoading ? (
    <Loader />
  ) : (
    <div className="groups-div">
      <h4>Create Group</h4>
      {error && <Message variant="danger">{error}</Message>}
      <Row className="form-row">
        <Col sm={4} lg={4} md={4} className="mt-3 mt-md-0">
          <FormControl className="form-field">
            <TextField
              required
              label="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              variant="standard"
            />
          </FormControl>
        </Col>
        <Col sm={4} lg={4} md={4} className="mt-3 mt-md-0">
          <FormControl className="form-field">
            <TextField
              required
              type="number"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              variant="standard"
            />
          </FormControl>
        </Col>
        <Col sm={4} lg={4} md={4} className="mt-3 mt-md-0">
          <FormControl className="form-field">
            <div className="add-group-form">
              <Autocomplete
                className="add-group-dropdown"
                id="auto-combo"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={userList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="User"
                    required
                  />
                )}
                value={selectedUser}
                onChange={(event, newValue) => {
                  setSelectedUser(newValue);
                }}
              />
              <AddIcon className="group-add-icon" onClick={addUser} />
            </div>
          </FormControl>
        </Col>
      </Row>
      <Row className="mt-3">
        <List>
          {selectedUserList.map(({ id, name }) => (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={deleteUser}
                  itemkey={id}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <UserIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className="parent-list" primary={name} />
            </ListItem>
          ))}
        </List>
      </Row>
      <Row className="mt-3 form-row">
        <Col xs={7} sm={6} md={6}>
          <FormControl variant="standard" className="form-field">
            <InputLabel required htmlFor="adornment-amount">
              Budget for the month
            </InputLabel>
            <Input
              id="adornment-amount"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              endAdornment={<InputAdornment position="end">¥</InputAdornment>}
            />
          </FormControl>
        </Col>
        <Col xs={5} sm={6} md={4}>
          <Button variant="primary" className="my-3" onClick={onCreateGroup}>
            Create group
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Groups;
