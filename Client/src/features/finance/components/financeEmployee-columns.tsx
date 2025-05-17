import { ColumnDef } from '@tanstack/react-table'
import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'

const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof FinanceEmployee['WorkScheduleDetails'];

export const financeEmployeeColumns: ColumnDef<FinanceEmployee>[] = [
  {
    accessorKey: 'Nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => <div>{row.original.UserInfo.Name || 'N/A'}</div>,
  },
  {
    accessorKey: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div>{row.original.UserInfo.Email || 'N/A'}</div>,
  },/* 
  {
    accessorKey: 'Address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => <div>{row.original.Address || 'N/A'}</div>,
  }, */
  {
    accessorKey: "Horário de trabalho",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Horário de trabalho" />
    ),
    cell: ({ row }) => (
      <div>{row.original.WorkScheduleDetails[currentDay] || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'Notas',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Notas' />
    ),
    cell: ({ row }) => <div>{row.original.Notes || 'N/A'}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
