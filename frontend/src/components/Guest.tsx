import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function Guest() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
