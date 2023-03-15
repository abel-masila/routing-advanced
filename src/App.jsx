import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

//Layouts
import Main, { mainLoader } from "./layouts/Main";
import Budget, { budgetAction, budgetLoader } from "./pages/Budget";

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Expenses, { expensesAction, expensesLoader } from "./pages/Expenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: budgetLoader,
        errorElement: <Error />,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
