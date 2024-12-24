import React from "react";
import { Icons } from "../../../Components/Icons/Icons";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import "./Dashboard.css";

const Dashboard = (auth) => {
  return (
    <>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header cargo={"Enfermeira"} />
          <div className="container">
            <div className="AfterSideBar">
              <div className="maindiv">
                <div className="one commondiv">
                  <div>
                    <h1>{}</h1>
                    <p>Sinais Vitais</p>
                  </div>
                  <Icons.TbActivityHeartbeat className="overviewIcon" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Pacientes</p>
                  </div>
                  <Icons.FiUsers className="overviewIcon" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Doador de sangue</p>
                  </div>
                  <Icons.BiDonateBlood className="overviewIcon doador-sangue" />
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
                    <p>Despachar Sangue</p>
                  </div>
                  <Icons.FaAmbulance className="overviewIcon" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Banco de Sangue</p>
                  </div>
                  <Icons.MdBloodtype
                    viewBox="0 0 20 20"
                    className="overviewIcon banco-sangue"
                  />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Operações</p>
                  </div>
                  <Icons.GiSurroundedShield className="overviewIcon" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Nascimentos</p>
                  </div>
                  <Icons.FaBaby className="overviewIcon nascimento" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Report de Óbitos</p>
                  </div>
                  <Icons.GiSurprisedSkull className="overviewIcon" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Profile</p>
                  </div>
                  <Icons.BsFillGearFill className="overviewIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
