import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGroupDetails } from "../actions/userAction";

const EditGroups = () => {
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
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return <div>EditGroups</div>;
};

export default EditGroups;
