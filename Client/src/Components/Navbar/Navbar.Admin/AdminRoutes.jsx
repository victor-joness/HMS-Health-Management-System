import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from "../../Icons/Icons";

const AdminRoutes = ({ auth, isOpen }) => {
  if (!auth.isAdmin) {
    return null;
  }

  return (
    <>
      <LinkRoute to="/admin/departamentos" icon={<Icons.MdOutlineGroups />} text="Departamentos" isOpen={isOpen} />

      <LinkRoute to="/admin/doutor" icon={<Icons.FaHandHoldingMedical />} text="Doutor" isOpen={isOpen} />
      <LinkRoute to="/admin/paciente" icon={<Icons.AiOutlineUserAdd />} text="Paciente" isOpen={isOpen} />
      <LinkRoute to="/admin/enfermeira" icon={<Icons.GiNurseFemale />} text="Enfermeira" isOpen={isOpen} />
      
      <LinkRoute to="/admin/farmacia" icon={<Icons.GiMedicines />} text="Farmacêutico" isOpen={isOpen} />
      <LinkRoute to="/admin/laboratorio" icon={<Icons.FaFileMedical />} text="Laboratório" isOpen={isOpen} />
      <LinkRoute to="/admin/recepcionista" icon={<Icons.RiUserReceivedFill style={{ color: 'white' }} />} text="Recepcionista" isOpen={isOpen} />
      <LinkRoute to="/admin/camas" icon={<Icons.TbBed />} text="Camas" isOpen={isOpen} />
      <LinkRoute to="/admin/ambulancias" icon={<Icons.FaAmbulance />} text="Ambulâncias" isOpen={isOpen} />
      <LinkRoute to="/admin/pagamentos" icon={<Icons.RiSecurePaymentLine />} text="Pagamentos" isOpen={isOpen} />
      {/* feito para dar permisoes e outras coisas de admin */}
      <LinkRoute to="/admin" icon={<Icons.RiAdminLine style={{ color: 'white' }} />} text="Admin" isOpen={isOpen} />
      <LinkRoute to="/admin-perfil" icon={<Icons.CgProfile />} text="Perfil" isOpen={isOpen} />
    </>
  );
};

const LinkRoute = ({ to, icon, text, isOpen }) => (
  <Link className="link" activeclassname="active" to={to} style={{ justifyContent: isOpen ? 'left' : 'center' }}>
    <div className="icon">
      {icon && React.cloneElement(icon, { className: 'mainIcon' })}
    </div>
    <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
      {text}
    </div>
  </Link>
);

export default AdminRoutes;