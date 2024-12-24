import React from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import {useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import Header from "../../Components/Header/Header";
import { UserRole } from "../../Utils/Enum";

import Dashboard_Admin from "../Admin/Dashboard/Dashboard";
import Dashboard_Doutor from "../Doutor/Doutor-dashboard/DoutorDashboard";
import Dashboard_Enfermeira from "../Enfermeira/Dashboard/Dashboard";

const Dashboard = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  return (
    <>
      {auth.role === UserRole.ADMIN ? (
        <Dashboard_Admin auth={auth}/>
      ) : auth.role === UserRole.DOUTOR ? (
        <Dashboard_Doutor auth={auth}/>
      ) : auth.role === UserRole.ENFERMEIRA ? (
        <Dashboard_Enfermeira auth={auth}/>
      ) : auth.role === UserRole.PACIENTE ? (
        <div className="home-container">
          <Navbar Cargo={auth}></Navbar>
          <div className="home-direita">
            <Header cargo={"Paciente"} />
            <div className="container">
              <div className="AfterSideBar">
                <div className="maindiv">
                  <div className="one commondiv">
                    <p>teste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound></NotFound>
      )}
    </>
  );
};

export default Dashboard;
