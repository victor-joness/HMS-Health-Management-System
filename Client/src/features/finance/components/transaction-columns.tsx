import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/entities/Transaction'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div>{row.original.Id || 'N/A'}</div>,
  },
  {
    accessorKey: 'Amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => <div>{row.original.Amount || 'N/A'}</div>,
  },
  {
    accessorKey: 'Category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => <div>{row.original.Category || 'N/A'}</div>,
  },
  {
    accessorKey: 'PaymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payment Method' />
    ),
    cell: ({ row }) => <div>{row.original.PaymentMethod || 'N/A'}</div>,
  },
  {
    accessorKey: 'Status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => <div>{row.original.Status || 'N/A'}</div>,
  },
  {
    accessorKey: 'TransactionDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Transaction Date' />
    ),
    cell: ({ row }) => <div>{row.original.TransactionDate || 'N/A'}</div>,
  },
  {
    accessorKey: 'Description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => <div>{row.original.Description || 'N/A'}</div>,
  },
  {
    accessorKey: 'Notes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Notes' />
    ),
    cell: ({ row }) => <div>{row.original.Notes || 'N/A'}</div>,
  },
  {
    accessorKey: 'IsRecurring',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Is Recurring' />
    ),
    cell: ({ row }) => <div>{row.original.IsRecurring ? 'Yes' : 'No'}</div>,
  },
  {
    accessorKey: 'DueDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Due Date' />
    ),
    cell: ({ row }) => <div>{row.original.DueDate || 'N/A'}</div>,
  },
  {
    accessorKey: 'PaidAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Paid At' />
    ),
    cell: ({ row }) => <div>{row.original.PaidAt || 'N/A'}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]