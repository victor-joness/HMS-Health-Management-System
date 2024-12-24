import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "../../Icons/Icons";
import { UserRole } from "../../../Utils/Enum";
import { RoutesProps, LinkRouteProps} from "../../../Types/TypesExport";

const EnfermeiraRoutes: React.FC<RoutesProps> = ({ auth, isOpen }) => {
  if (auth.role !== UserRole.ENFERMEIRA) {
    return null;
  }

  return (
    <>
      <LinkRoute
        to="/enfermeira-sinaisvital"
        icon={<Icons.TbActivityHeartbeat />}
        text="Sinais Vitais"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-pacientes"
        icon={<Icons.FaUsers />}
        text="Pacientes"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-camas"
        icon={<Icons.FaBed />}
        text="Listagem de camas"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-addcamas"
        icon={<Icons.IoBedSharp />}
        text="Adicionar Cama"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-doador"
        icon={<Icons.BiDonateBlood />}
        text="Doador de Sangue"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-despachar"
        icon={<Icons.FaAmbulance />}
        text="Despachar Sangue"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-banco"
        icon={<Icons.BsBank />}
        text="Banco de Sangue"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-operacoes"
        icon={<Icons.GiSurroundedShield />}
        text="Operações"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-nascimentos"
        icon={<Icons.FaBaby />}
        text="Nascimentos"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-obitos"
        icon={<Icons.GiSurprisedSkull />}
        text="Óbitos"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/enfermeira-perfil"
        icon={<Icons.CgProfile />}
        text="Perfil"
        isOpen={isOpen}
      />
    </>
  );
};

const LinkRoute: React.FC<LinkRouteProps> = ({ to, icon, text, isOpen }) => {
  const location = useLocation(); // Hook para pegar o caminho atual
  const isActive = location.pathname === to; // Verifica se o link atual é o mesmo que o caminho

  return (
    <Link
      className={`link ${isActive ? "active" : ""}`} // Aplica a classe 'active' se o link for o atual
      to={to}
      style={{ justifyContent: isOpen ? "left" : "center" }}
    >
      <div className="icon">
        {icon && React.cloneElement(icon, { className: "mainIcon" })}
      </div>
      <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
        {text}
      </div>
    </Link>
  );
};

export default EnfermeiraRoutes;
