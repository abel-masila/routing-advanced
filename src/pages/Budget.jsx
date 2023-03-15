//loader

import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpsenseForm from "../components/AddExpsenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
  waait,
} from "../helpers";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) throw new Error("Budget not found!");
  return {
    budget,
    expenses,
  };
}
export async function budgetAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted!`);
    } catch (error) {
      throw new Error("Error deleting your expense.");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      console.log(error);
      throw new Error("Error creating your expense.");
    }
  }
}
const Budget = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpsenseForm budgets={[budget]} />
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span> Expenses
            </h2>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
