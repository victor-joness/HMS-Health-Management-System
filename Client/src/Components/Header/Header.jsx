import React from "react";
import "./Header.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/authSlice";

const Header = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  return (
    <div className="header">
      <h1>Header</h1>
      <div className="infos">
        <div className="image">
          <img src={`../../../public/upload/${auth.Img}`} alt="" />
        </div>
        <h1>{auth.name}</h1>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
