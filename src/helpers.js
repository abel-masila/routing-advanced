//Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// export const deleteItem = ({ key }) => {
//   return localStorage.removeItem(key);
// };

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const calculateSpentByBudget = (budgetId) => {
  const expense = fetchData("expenses") ?? [];
  const budgetSpent = expense.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

export const formatPercentage = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
export const formatCurrency = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocalString = (epoch) =>
  new Date(epoch).toLocaleDateString();

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];

  return data.filter((item) => item[key] === value);
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
