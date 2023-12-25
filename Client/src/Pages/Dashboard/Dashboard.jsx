import React from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";
import { Icons } from "../../Components/Icons/Icons";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "../NotFound/NotFound";

import { logoutUser, loadUser } from "../../Features/authSlice";

import Header from "../../Components/Header/Header";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => {
    return state.auth;
  });

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  return (
    <>
      {auth.isAdmin ? (
        <div className="home-container">
          <Navbar Cargo={auth}></Navbar>
          <div className="home-direita">
            <Header cargo={"Admin"} />
            <div className="container">
              <div className="AfterSideBar">
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
            </div>
          </div>
        </div>
      ) : auth.isDoutor ? (
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
      ) : auth.isEnfermeira ? (
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
      ) : auth.isPaciente ? (
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
