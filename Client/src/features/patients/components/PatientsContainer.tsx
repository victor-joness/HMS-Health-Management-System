import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import PacienteCard from './PacienteCard'

const PatientsContainer = ({ pacientesData }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 10

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentPacientes = pacientesData.slice(
    indexOfFirstCard,
    indexOfLastCard
  )
  const totalPages = Math.ceil(pacientesData.length / cardsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <div className='flex justify-center items-center flex-wrap w-full mx-auto text-center text-2xl gap-4'>
        {currentPacientes.length > 0 ? (
          <>
            {currentPacientes.map((paciente: any) => (
              <PacienteCard key={paciente.pacienteId} paciente={paciente} />
            ))}
          </>
        ) : (
          <p className='text-xl text-gray-700'>Nenhum paciente encontrado.</p>
        )}

        {currentPacientes.length > 10 && (
          <Pagination className='mb-10'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}

export default PatientsContainer
