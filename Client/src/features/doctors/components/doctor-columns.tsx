import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Doctor } from '@/entities/Doctor'
import { DataTableColumnHeader } from '../../../components/table/data-table-column-header'
import { DataTableRowActions } from '../../../components/table/data-table-row-actions'

export const doctorColumns: ColumnDef<Doctor>[] = [
  /* {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }, */
  {
    accessorKey: 'Nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.original.UserInfo?.Name}</LongText>
    ),
    enableHiding: false,
    accessorFn: (row) => row.UserInfo?.Name,
  },
  {
    accessorKey: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.original.UserInfo?.Email}</div>
    ),
  },
  {
    accessorKey: 'Telefone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Telefone' />
    ),
    cell: ({ row }) => <div>{row.original.UserInfo?.PhoneNumber}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'Especialidade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Especialidade' />
    ),
    cell: ({ row }) => <div>{row.original.Speciality || 'N/A'}</div>,
  },
  {
    accessorKey: 'Anos de experiência',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='YOE' />
    ),
    cell: ({ row }) => <div>{row.original.YearsOfExperience || 'N/A'}</div>,
  },
  {
    accessorKey: 'Departamento',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Departamento' />
    ),
    cell: ({ row }) => <div>{row.original.Department || 'N/A'}</div>,
  },
  {
    accessorKey: 'CRM',
    header: ({ column }) => <DataTableColumnHeader column={column} title='CRM/Registro' />,
    cell: ({ row }) => <div>{row.original.MedicalLicenseNumber || 'N/A'}</div>,
  },
  {
    accessorKey: 'Disponivel na emergência',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Disponibilidade' />
    ),
    cell: ({ row }) => (
      <span>{row.original.EmergencyAvailability ? 'Disponível' : 'Não disponível'}</span>
    ),
    enableHiding: false,
    accessorFn: (row) => row.EmergencyAvailability,
  },
  {
    accessorKey: 'Imagem',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Imagem' />
    ),
    cell: ({ row }) => (
      <div className='w-12 h-12'>
        <img
          src={row.original.UserInfo?.Img || '/default-avatar.png'}
          alt='Foto do Doutor'
          className='w-full h-full rounded-full object-cover border'
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
