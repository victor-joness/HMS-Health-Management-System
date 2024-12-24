import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from "../../Icons/Icons";
import { UserRole } from "../../../Utils/Enum";
import { RoutesProps, LinkRouteProps } from "../../../Types/TypesExport";

interface DoutorRoutesProps extends RoutesProps {
  handleLogout?: () => void;
}

const DoutorRoutes: React.FC<DoutorRoutesProps> = ({ auth, isOpen, handleLogout }) => {
  if (auth.role !== UserRole.DOUTOR) {
    return null;
  }

  return (
    <>
      <LinkRoute to="/doutor-prescrições" icon={<Icons.GiMedicines />} text="Prescrições" isOpen={isOpen} />
      <LinkRoute to="/doutor-fila" icon={<Icons.MdQueue />} text="Fila" isOpen={isOpen} />
      <LinkRoute to="/doutor-sinaisvital" icon={<Icons.TbActivityHeartbeat />} text="Sinais Vitais" isOpen={isOpen} />
      <LinkRoute to="/doutor/pacientes" icon={<Icons.FaUsers />} text="Pacientes" isOpen={isOpen} />
      <LinkRoute to="/doutor-consultas" icon={<Icons.AiOutlineClockCircle />} text="Consultas" isOpen={isOpen} />
      <LinkRoute to="/doutor-camas" icon={<Icons.TbBed />} text="Camas" isOpen={isOpen} />
      <LinkRoute to="/doutor/doador" icon={<Icons.BiDonateBlood />} text="Doador de Sangue" isOpen={isOpen} />
      <LinkRoute to="/doutor/despachar" icon={<Icons.FaAmbulance />} text="Despachar Sangue" isOpen={isOpen} />
      <LinkRoute to="/doutor/banco" icon={<Icons.BsBank />} text="Banco de Sangue" isOpen={isOpen} />
      <LinkRoute to="/doutor/operacoes" icon={<Icons.GiSurroundedShield />} text="Operações" isOpen={isOpen} />
      <LinkRoute to="/doutor-nascimentos" icon={<Icons.FaBaby />} text="Nascimentos" isOpen={isOpen} />
      <LinkRoute to="/doutor-obitos" icon={<Icons.GiSurprisedSkull />} text="Óbitos" isOpen={isOpen} />
      <LinkRoute to="/doutor/perfil" icon={<Icons.SlUserFollow />} text="Perfil" isOpen={isOpen} />
      <LinkRoute to="/doutor-reports" icon={<Icons.TbReportMedical />} text="All Reports" isOpen={isOpen} />
      <LinkRoute to="/create-report" icon={<Icons.BiDetail />} text="Create Report" isOpen={isOpen} />
    </>
  );
};

const LinkRoute: React.FC<LinkRouteProps> = ({ to, icon, text, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`link ${isActive ? "active" : ""}`}
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



export default DoutorRoutes;
