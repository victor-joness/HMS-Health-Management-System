import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { ArrowForward as ArrowIcon } from "@mui/icons-material";
import React from "react";

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  // Divida o caminho da URL
  const pathnames = location.pathname
    .replace('/dashboard', '')  // Remover '/dashboard' se estiver presente
    .split("/")
    .filter((x) => x);  // Filtrar valores vazios

  // Verifique se o caminho contém a parte "admin", se sim, remova a duplicação
  const adjustedPathnames = pathnames.length > 0 && pathnames[0] === "admin" ? pathnames.slice(1) : pathnames;

  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ArrowIcon fontSize="small" />}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          fontSize: "1.125rem", // Tamanho maior
          backgroundColor: "white", // Cor de fundo branca
          padding: "10px 16px", // Mais espaçamento
          borderRadius: "8px", // Bordas quadradas
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra sutil
          width: "fit-content",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#007bff", // Cor de link
            fontWeight: 500,
          }}
        >
          Admin
        </Link>

        {adjustedPathnames.map((value, index) => {
          const to = `/admin/${adjustedPathnames.slice(0, index + 1).join("/")}`;

          return index === adjustedPathnames.length - 1 ? (
            <Typography
              color="textPrimary"
              key={to}
              sx={{ fontWeight: 600, color: "#333" }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: "none",
                color: "#6c757d", // Cor do texto
                fontWeight: 500,
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
};

export default Breadcrumb;
