import { useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getExpense } from "../actions/expenseAction";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { columns } from "../constants/expenseDataColumn";

const ViewExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const expense = useSelector((state) => state.expenseGet);
  const { expenseData, loading } = expense;

  useEffect(() => {
    if (userInfo) {
      dispatch(getExpense);
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const onEdit = useCallback(async (newRow, oldRow) => {
    console.log(newRow, oldRow);
    return newRow;
  }, []);

  const handleProcessRowUpdateError = useCallback((error) => {
    console.log(error);
  }, []);

  return (
    <div style={{ height: "85vh", width: "100%" }}>
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
  );
};

export default ViewExpense;
