'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Influencer } from './schema';
import { Youtube, Instagram } from 'lucide-react';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<Influencer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="w-[120px] truncate">{row.getValue("name")}</div>,
  },
  {
    accessorKey: 'platform',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Platform" />,
    cell: ({ row }) => {
      const platform = row.getValue('platform') as string;
      return <div className="flex justify-center">{platform === 'YouTube' ? <Youtube className="h-5 w-5 text-muted-foreground" /> : <Instagram className="h-5 w-5 text-muted-foreground" />}</div>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'followers',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Followers" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('followers'));
      if (amount >= 1000000) {
        return <div className="text-right font-medium">{(amount / 1000000).toFixed(1)}M</div>;
      }
       if (amount >= 1000) {
        return <div className="text-right font-medium">{(amount / 1000).toFixed(1)}K</div>;
      }
      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: 'engagementRate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Eng. %" />,
    cell: ({ row }) => {
        const rate = parseFloat(row.getValue('engagementRate'));
        return <div className="text-right font-medium">{rate.toFixed(2)}%</div>;
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
        const status = row.getValue('status') as string;
        let variant: 'default' | 'secondary' | 'outline' = 'secondary';
        if (status === 'New') variant = 'default';
        if (status === 'In talks') variant = 'outline';
        if (status === 'Signed') variant = 'default';
        
        return <Badge variant={variant} className={`capitalize ${status === 'Signed' ? 'bg-green-500/80 text-white' : ''}`}>{status}</Badge>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
