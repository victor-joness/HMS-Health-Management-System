import React, { useState } from "react";
import PacienteCard from "../PacienteCard/PacienteCard";
import PaginationComponent from "../Pagination/Pagination";

const PacientesContainer = ({ pacientesData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPacientes = pacientesData.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(pacientesData.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="container-cards">
        {currentPacientes.map((paciente) => (
          <PacienteCard key={paciente.pacienteId} paciente={paciente} />
        ))}
      </div>
      
      <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default PacientesContainer;
