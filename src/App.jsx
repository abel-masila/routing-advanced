import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader,
  },
  {
    path: "/about",
    element: <h1>about</h1>,
  },
]);
const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
