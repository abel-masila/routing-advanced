import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";

//Loader
export function dashboardLoader() {
  const userName = fetchData("userName");

  return {
    userName,
  };
}
const Dashboard = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <h3>Dashboard</h3>
      {userName}
    </div>
  );
};

export default Dashboard;
