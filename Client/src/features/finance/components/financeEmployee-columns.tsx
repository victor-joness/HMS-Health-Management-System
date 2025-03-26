import { ColumnDef } from '@tanstack/react-table'
import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'

export const financeEmployeeColumns: ColumnDef<FinanceEmployee>[] = [
  {
    accessorKey: 'UserInfo.Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div>{row.original.UserInfo.Name || 'N/A'}</div>,
  },
  {
    accessorKey: 'UserInfo.Email',
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
    accessorKey: 'WorkScheduleDetails.Monday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Monday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Monday || 'N/A'}</div>,
  },
  {
    accessorKey: 'WorkScheduleDetails.Tuesday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tuesday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Tuesday || 'N/A'}</div>,
  },
  {
    accessorKey: 'WorkScheduleDetails.Wednesday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Wednesday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Wednesday || 'N/A'}</div>,
  },
  {
    accessorKey: 'WorkScheduleDetails.Thursday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Thursday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Thursday || 'N/A'}</div>,
  },
  {
    accessorKey: 'WorkScheduleDetails.Friday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Friday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Friday || 'N/A'}</div>,
  },
  {
    accessorKey: 'WorkScheduleDetails.Saturday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Saturday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Saturday || 'N/A'}</div>,
  },
  {
    accessorKey: 'WorkScheduleDetails.Sunday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sunday' />
    ),
    cell: ({ row }) => <div>{row.original.WorkScheduleDetails.Sunday || 'N/A'}</div>,
  },
  {
    accessorKey: 'Notes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Notes' />
    ),
    cell: ({ row }) => <div>{row.original.Notes || 'N/A'}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
