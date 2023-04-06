import { useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

const BudgetCard = ({ name }) => {
  const expense = useSelector((state) => state.expenseGet);
  const { expenseData, loading } = expense;

  const group = useSelector((state) => state.getGroupDetails);
  const { groupDetails } = group;
  let sendAmount = 0;
  let sendName = name;
  let variant = "info";
  let sendPercent = 0;

  let expenseAmt = 0,
    budgetAmt = 0,
    remainingAmt = 0;
  expenseData.forEach((e) => {
    expenseAmt += e.amount;
  });
  if (groupDetails) {
    budgetAmt = groupDetails.budget;
  }
  remainingAmt = budgetAmt - expenseAmt;

  const getPercent = (x, y) => {
    return (x / y) * 100;
  };

  if (name === "remaining") {
    sendAmount = remainingAmt;
    sendName = "Remaing Amount";
    sendPercent = getPercent(remainingAmt, budgetAmt);
    sendPercent < 20
      ? (variant = "danger")
      : sendPercent < 40
      ? (variant = "warning")
      : (variant = "success");
  } else if (name === "expense") {
    sendAmount = expenseAmt;
    sendName = "Total Expense";
    sendPercent = getPercent(expenseAmt, budgetAmt);
    sendPercent < 60
      ? (variant = "success")
      : sendPercent < 80
      ? (variant = "warning")
      : (variant = "success");
  } else if (name === "budget" && groupDetails) {
    sendAmount = budgetAmt;
    sendName = "Budget";
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Message variant={variant}>{`${sendName}: ${sendAmount}¥`}</Message>
      )}
    </>
  );
};

export default BudgetCard;
