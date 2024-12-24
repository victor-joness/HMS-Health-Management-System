import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import { Icons } from "../../../Components/Icons/Icons";
import "./Dashboard.css";

const Dashboard = (auth : string) => {
  return (
    <div className="home-container">
      <Navbar></Navbar>
      <div className="home-direita">
        <Header/>
        <div className="container">
          <div className="menu-admin">
            <div className="maindiv">
              <div className="one commondiv">
                <div>
                  <h1>{}</h1>
                  <p>Doutores</p>
                </div>
                <Icons.MdPersonAdd className="overviewIcon" />
              </div>
              <div className="two commondiv">
                {" "}
                <div>
                  <h1>{}</h1>
                  <p>Enfermeiras</p>
                </div>
                <Icons.FaUserNurse className="overviewIcon" />
              </div>
              <div className="three commondiv">
                <div>
                  <h1>{}</h1>
                  <p>Pacientes</p>
                </div>
                <Icons.RiEmpathizeLine className="overviewIcon" />
              </div>
              <div className="six commondiv">
                {" "}
                <div>
                  <h1>{}</h1>
                  <p>Admin</p>
                </div>
                <Icons.RiAdminLine className="overviewIcon" />
              </div>
              <div className="four commondiv">
                {" "}
                <div>
                  <h1>{}</h1>
                  <p>Camas</p>
                </div>
                <Icons.FaBed className="overviewIcon" />
              </div>

              <div className="five commondiv">
                {" "}
                <div>
                  <h1>{}</h1>
                  <p>Ambulancias</p>
                </div>
                <Icons.FaAmbulance className="overviewIcon" />
              </div>
              <div className="six commondiv">
                {" "}
                <div>
                  <h1>{}</h1>
                  <p>Consultas</p>
                </div>
                <Icons.BsFillBookmarkCheckFill
                  viewBox="0 0 20 20"
                  className="overviewIcon"
                />
              </div>
              <div className="six commondiv">
                {" "}
                <div>
                  <h1>{}</h1>
                  <p>Registros</p>
                </div>
                <Icons.MdPayment className="overviewIcon" />
              </div>
            </div>
          </div>
          <div className="content-admin">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
