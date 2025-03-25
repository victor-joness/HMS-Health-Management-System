import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { Pharmacy } from '@/entities/Pharmacy'
import { DataTableColumnHeader } from '@/components/ui/data-table'

export const pharmaciesColumns: ColumnDef<Pharmacy>[] = [
  {
    accessorKey: 'Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => <LongText>{row.original.Name || 'N/A'}</LongText>,
  },
  {
    accessorKey: 'Address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Endereço' />
    ),
    cell: ({ row }) => <div>{row.original.Address || 'N/A'}</div>,
  },
  {
    accessorKey: 'Phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Telefone' />
    ),
    cell: ({ row }) => <div>{row.original.Phone || 'N/A'}</div>,
  },
  {
    accessorKey: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='E-mail' />
    ),
    cell: ({ row }) => <div>{row.original.Email || 'N/A'}</div>,
  },
  {
    accessorKey: 'Cnpj',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CNPJ' />
    ),
    cell: ({ row }) => <div>{row.original.Cnpj || 'N/A'}</div>,
  },
  {
    accessorKey: 'OpeningHours',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Horário de Funcionamento' />
    ),
    cell: ({ row }) => <div>{row.original.OpeningHours || 'N/A'}</div>,
  },
  {
    accessorKey: 'IsActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ativa' />
    ),
    cell: ({ row }) => <div>{row.original.IsActive ? 'Sim' : 'Não'}</div>,
  },
  {
    accessorKey: 'CreationDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data de Criação' />
    ),
    cell: ({ row }) => <div>{row.original.CreationDate || 'N/A'}</div>,
  },
  {
    accessorKey: 'ModifiedDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Última Modificação' />
    ),
    cell: ({ row }) => <div>{row.original.ModifiedDate || 'N/A'}</div>,
  },
  {
    accessorKey: 'DeletionDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data de Exclusão' />
    ),
    cell: ({ row }) => <div>{row.original.DeletionDate || 'N/A'}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <PharmacyRowActions row={row} />,
  },
]
