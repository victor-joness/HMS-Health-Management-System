import React, {useEffect} from "react";
import "./Home.css";

import logo from "../../Assets/LOGO.png";
import banner from "../../Assets/banner.png"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.id) {
      navigate(`/dashboard`);
    }
  }, [auth.id, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="mainLoginPage">
      <div className="leftside">
        <img src={banner} alt="banner" />
      </div>
      <div className="rightside">
        <div className="container-home">
          <div className="container-home-center">
            <div className="image">
              <img src={logo} alt="" />
            </div>
            <h1>Bem Vindo ao HMS</h1>
            <div className="buttons">
              <button className="container-home-login" onClick={handleLogin}>
                Login
              </button>
              <button className="container-home-login" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
