import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
  try {
    deleteItem({ key: "budgets", id: params.id });
    const expenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    expenses.forEach((expense) =>
      deleteItem({
        key: "expenses",
        id: expense.id,
      })
    );
    toast.success("Deleted!");
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting the item");
  }
  return redirect("/");
}
