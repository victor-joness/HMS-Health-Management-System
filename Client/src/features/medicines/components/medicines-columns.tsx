import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { Medicines } from '@/entities/Medicines'
import { DataTableColumnHeader } from '@/components/ui/data-table'

export const medicinesColumns: ColumnDef<Medicines>[] = [
  {
    accessorKey: 'Nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => <LongText>{row.original.Name || 'N/A'}</LongText>,
  },
  {
    accessorKey: 'Descrição',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Descrição' />
    ),
    cell: ({ row }) => <div>{row.original.Description || 'N/A'}</div>,
  },
  {
    accessorKey: 'Tipo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipo' />
    ),
    cell: ({ row }) => <div>{row.original.type || 'N/A'}</div>,
  },
  {
    accessorKey: 'Fabricante',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fabricante' />
    ),
    cell: ({ row }) => <div>{row.original.manufacturer || 'N/A'}</div>,
  },
  {
    accessorKey: 'Número do lote',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lote' />
    ),
    cell: ({ row }) => <div>{row.original.batch_number || 'N/A'}</div>,
  },
  {
    accessorKey: 'Quantidade em stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estoque' />
    ),
    cell: ({ row }) => <div>{row.original.quantity_in_stock}</div>,
  },
  {
    accessorKey: 'Preço por unidade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Preço por Unidade' />
    ),
    cell: ({ row }) => <div>{row.original.price_per_unit}</div>,
  },
  {
    accessorKey: 'Data de validade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Validade' />
    ),
    cell: ({ row }) => <div>{row.original.expiry_date || 'N/A'}</div>,
  },
  {
    accessorKey: 'Instruções de estoque',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Instruções de Armazenamento' />
    ),
    cell: ({ row }) => <div>{row.original.storage_instructions || 'N/A'}</div>,
  },
  {
    id: 'Ações',
    cell: ({ row }) => <PharmacyRowActions row={row} />,
  },
]
