import React, { useEffect, useState } from "react";
import "./DoutorPacientePerfil.css";
import { useDispatch, useSelector } from "react-redux";
import Perfil from "../../../Components/Perfil/Perfil";
import { useLocation } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

import { pacienteFetch } from "../../../Features/PacientesSlice";

const DoutorPacientePerfil = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pacienteFetch(id));
  }, [dispatch, pacienteFetch]);

  const pacientes = useSelector((state) => {
    return state.pacientes;
  });

  if (pacientes.status != "success") {
    return <Loading />;
  } else {
    //return <Loading />;
    return <Perfil User={pacientes.pacientes[0]} />;
  }
};

export default DoutorPacientePerfil;
