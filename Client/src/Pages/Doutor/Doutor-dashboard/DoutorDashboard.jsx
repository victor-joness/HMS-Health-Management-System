import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import "./DoutorDashboard.css";
import { Icons } from "../../../Components/Icons/Icons";

const DoutorDashboard = (auth) => {
  return (
    <>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header cargo={"Doutor"} />
          <div className="container">
            <div className="AfterSideBar">
              <div className="maindiv">
                <div className="one commondiv">
                  <div>
                    <h1>{}</h1>
                    <p>Pacientes</p>
                  </div>
                  <Icons.AiOutlineUser className="overviewIcon" />
                </div>
                <div className="two commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Fila</p>
                  </div>
                  <Icons.MdAddToQueue className="overviewIcon" />
                </div>
                <div className="three commondiv">
                  <div>
                    <h1>{}</h1>
                    <p>Prescrições</p>
                  </div>
                  <Icons.RiEmpathizeLine className="overviewIcon" />
                </div>
                <div className="six commondiv">
                  {" "}
                  <div>
                    <h1>{}</h1>
                    <p>Consultas</p>
                  </div>
                  <Icons.BsFillCalendarDateFill className="overviewIcon" />
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

export default DoutorDashboard;
