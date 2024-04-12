import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AllFiles from "../pages/AllFiles";
import EditDocument from "../pages/EditDocument";

const routes = {
  "/login": () => <Login />,
  "/edit": () => <EditDocument />,
  "/signup": () => <Signup />,
  "/": () => <Home />,
  "/all": () => <AllFiles />,
  "edit/:id": () => <EditDocument />,
};
export default routes;
