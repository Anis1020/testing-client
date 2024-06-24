import { Outlet } from "react-router-dom";
import Navbar from "../share/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="w-[80%] mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
