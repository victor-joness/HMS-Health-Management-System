import React, { useState } from "react";
import "./Header.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/authSlice";
import { Icons } from "../../Components/Icons/Icons";

const Header = ({ auth, cargo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeNotification = () => {
    console.log("teste para apagar notificaiton");
  };

  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="infos">
        <div className="notification-container">
          <div className="notification-icon" onClick={handleModal}>
            <Icons.IoMdNotifications className="notification" />
          </div>

          <div className={`modal ${isModalOpen ? "open" : ""}`}>
            <div className="modal-content">
              <h2 style={{textAlign:"center", marginBottom: "5px"}}>Ultimas Notificações</h2>
              {/* posso fazer um modal unico para cada menssagem e passsar issos no map de uma lissta */}
              <div className="modal-infos">
                <p>This is a static notification message!</p>
                <span className="close" onClick={closeNotification}>
                  &times;
                </span>
              </div>

              <div className="modal-infos">
                <p>This is a static notification message!</p>
                <span className="close" onClick={closeNotification}>
                  &times;
                </span>
              </div>
            </div>
          </div>
        </div>
        <a className="image" href="/doutor-perfil">
          <img src={`upload/${auth.Img}`} alt="" />
        </a>
        <div className="infos-user">
          <h1>{auth.name}</h1>
          <h2>{cargo}</h2>
        </div>
        {/* <Icons.FiLogOut className="logout-header" onClick={handleLogout}/> */}
      </div>
    </div>
  );
};

export default Header;
