import { ColumnDef } from '@tanstack/react-table'
import { HumanResourcesEmployee } from '@/entities/HumanResourcesEmployee'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import LongText from '@/components/long-text'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'

export const humanResourcesEmployeeColumns: ColumnDef<HumanResourcesEmployee>[] =
  [
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
        <LongText>{row.original.UserInfo.Name || 'N/A'}</LongText>
      ),
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
      accessorKey: 'Imagem',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Imagem' />
      ),
      cell: ({ row }) => (
        <div className='w-12 h-12'>
          <img
            src={row.original.UserInfo.Img || '/default-avatar.png'}
            alt='Foto do Funcionário'
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
  ]
