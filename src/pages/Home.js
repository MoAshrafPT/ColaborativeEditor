import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GuestView  from "../Layouts/GuestView";
import UserView  from "../Layouts/UserView"

export default function Home() {
  const isLoggedIn = (Cookies.get("token") !== undefined);
 
  return <>{isLoggedIn ? <UserView /> : <GuestView />}</>;
}
