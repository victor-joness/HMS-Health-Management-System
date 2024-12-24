import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "../../Icons/Icons";
import { UserRole } from "../../../Utils/Enum";
import { LinkRouteProps, RoutesProps } from "../../../Types/TypesExport";

// Componente AdminRoutes
const AdminRoutes: React.FC<RoutesProps> = ({ auth, isOpen }) => {
  if (auth.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <>
      <LinkRoute
        to="/admin/departamentos"
        icon={<Icons.MdOutlineGroups />}
        text="Departamentos"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/doutor"
        icon={<Icons.FaHandHoldingMedical />}
        text="Doutor"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/paciente"
        icon={<Icons.AiOutlineUserAdd />}
        text="Paciente"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/enfermeira"
        icon={<Icons.GiNurseFemale />}
        text="Enfermeira"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/farmacia"
        icon={<Icons.GiMedicines />}
        text="Farmacêutico"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/laboratorio"
        icon={<Icons.FaFileMedical />}
        text="Laboratório"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/recepcionista"
        icon={<Icons.RiUserReceivedFill style={{ color: "white" }} />}
        text="Recepcionista"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/camas"
        icon={<Icons.TbBed />}
        text="Camas"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/ambulancias"
        icon={<Icons.FaAmbulance />}
        text="Ambulâncias"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin/pagamentos"
        icon={<Icons.RiSecurePaymentLine />}
        text="Pagamentos"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin"
        icon={<Icons.RiAdminLine style={{ color: "white" }} />}
        text="Admin"
        isOpen={isOpen}
      />
      <LinkRoute
        to="/admin-perfil"
        icon={<Icons.CgProfile />}
        text="Perfil"
        isOpen={isOpen}
      />
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

export default AdminRoutes;
