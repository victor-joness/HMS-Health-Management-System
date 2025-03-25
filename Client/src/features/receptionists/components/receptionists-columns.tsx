import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { Receptionist } from '@/entities/Receptionist'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'

export const receptionistColumns: ColumnDef<Receptionist>[] = [
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
    cell: ({ row }) => <LongText>{row.original.UserInfo?.Name || 'N/A'}</LongText>,
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
          alt='Foto do Recepcionista'
          className='w-full h-full rounded-full object-cover border'
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  },
]
