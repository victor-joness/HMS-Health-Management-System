import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Icons} from "../Icons/Icons";

import EnfermeiraRoutes from "./Navbar.Enfermeira/EnfermeiraRoutes.jsx";
import AdminRoutes from "./Navbar.Admin/AdminRoutes.jsx";
import DoutorRoutes from "./Navbar.Doutor/DoutorRoutes.jsx";


import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector((state) => {return state.auth});

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div>
        <div style={{ width: isOpen ? "200px" : "70px" }} className={`sidebar`}>
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              HMS
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <Icons.ImMenu onClick={toggle} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className="bottomSection">
            <Link
              className="link"
              activeclassname="active"
              style={{ justifyContent: isOpen ? "left" : "center" }}
              to={"/dashboard"}
            >
              <div className="icon">
                <Icons.MdDashboardCustomize className="mainIcon" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                DashBoard
              </div>
            </Link>
            {/* ENFERMEIRA */}
            <EnfermeiraRoutes auth={auth} isOpen={isOpen} />
            {/* ADMIN */}
            <AdminRoutes auth={auth} isOpen={isOpen} />
            {/* DOUTOR */}
            <DoutorRoutes auth={auth} isOpen={isOpen}/>
            {/* LOGOUT */}
            <Link
              className="LogOutPath link"
              onClick={handleLogout}
              style={{ justifyContent: isOpen ? "left" : "center" }}
            >
              <div className="icon">
                <Icons.FiLogOut />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
