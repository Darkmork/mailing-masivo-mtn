import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Play, Pause, Trash2, Repeat } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { DataTable } from '../components/shared/DataTable';
import { Campaign, CampaignStatus } from '../lib/types';
import { useCampaigns } from '../services/api';
import PageHeader from '../components/shared/PageHeader';
import { formatAppDate } from '../lib/utils';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/card';

const getStatusBadge = (status: CampaignStatus) => {
    const styles: Record<CampaignStatus, string> = {
        [CampaignStatus.DRAFT]: 'bg-gray-200 text-gray-800',
        [CampaignStatus.RUNNING]: 'bg-blue-200 text-blue-800 animate-pulse',
        [CampaignStatus.PAUSED]: 'bg-yellow-200 text-yellow-800',
        [CampaignStatus.FINISHED]: 'bg-green-200 text-green-800',
        [CampaignStatus.CANCELLED]: 'bg-red-200 text-red-800',
    };
    return (
        <span className={cn('px-2 py-1 text-xs font-semibold rounded-full', styles[status])}>
            {status}
        </span>
    );
};

const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Nombre Campaña",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    accessorKey: "stats.sent",
    header: "Enviados",
    cell: ({ row }) => `${row.original.stats.sent.toLocaleString('es-CL')} / ${row.original.stats.total.toLocaleString('es-CL')}`,
  },
    {
    accessorKey: "stats.opened",
    header: "Abiertos",
    cell: ({ row }) => {
        const rate = row.original.stats.sent > 0 ? (row.original.stats.opened / row.original.stats.sent * 100).toFixed(1) : 0;
        return `${row.original.stats.opened.toLocaleString('es-CL')} (${rate}%)`
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creada",
    cell: ({ row }) => formatAppDate(row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const campaign = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Ver Reporte</DropdownMenuItem>
             {campaign.status === 'DRAFT' && <DropdownMenuItem><Play className="mr-2 h-4 w-4"/>Enviar Ahora</DropdownMenuItem>}
             {campaign.status === 'RUNNING' && <DropdownMenuItem><Pause className="mr-2 h-4 w-4"/>Pausar</DropdownMenuItem>}
             {campaign.status === 'PAUSED' && <DropdownMenuItem><Play className="mr-2 h-4 w-4"/>Reanudar</DropdownMenuItem>}
             {campaign.status === 'FINISHED' && <DropdownMenuItem><Repeat className="mr-2 h-4 w-4"/>Reintentar Fallidos</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/>Cancelar/Borrar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function CampaignsPage() {
    const { data, isLoading, isError } = useCampaigns();

    return (
        <>
            <PageHeader
                title="Campañas"
                description="Crea, programa y monitorea tus envíos masivos."
            >
                <Button variant="accent">Nueva Campaña</Button>
            </PageHeader>
            <Card>
                <CardContent className="p-0">
                    {isLoading && <div className="p-4"><Skeleton className="h-64 w-full" /></div>}
                    {isError && <div>Error al cargar las campañas.</div>}
                    {data && <DataTable columns={columns} data={data} filterColumnId="name" filterPlaceholder="Filtrar por nombre..." />}
                </CardContent>
            </Card>
        </>
    );
}