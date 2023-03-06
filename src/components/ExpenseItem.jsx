import { formatCurrency, formatDateToLocalString } from "../helpers";

const ExpenseItem = ({ expense }) => {
  const { name, createdAt, amount } = expense;
  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocalString(createdAt)}</td>
    </>
  );
};

export default ExpenseItem;
