import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";

export async function logoutAction() {
  //delete user
  deleteItem({ key: "userName" });
  //return redirect
  return redirect("/");
}
