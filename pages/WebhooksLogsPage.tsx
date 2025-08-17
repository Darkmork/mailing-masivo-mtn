
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../components/shared/DataTable';
import { WebhookEvent } from '../lib/types';
import { useWebhookEvents } from '../services/api';
import PageHeader from '../components/shared/PageHeader';
import { formatAppDate } from '../lib/utils';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';

const getEventTypeBadge = (type: WebhookEvent['type']) => {
    const styles: Record<WebhookEvent['type'], string> = {
        delivered: 'bg-green-100 text-green-800',
        open: 'bg-blue-100 text-blue-800',
        click: 'bg-purple-100 text-purple-800',
        bounce: 'bg-yellow-100 text-yellow-800',
        spam: 'bg-red-100 text-red-800',
    };
    return (
        <span className={cn('px-2 py-1 text-xs font-semibold rounded-full', styles[type])}>
            {type}
        </span>
    );
};


const columns: ColumnDef<WebhookEvent>[] = [
  {
    accessorKey: "timestamp",
    header: "Fecha",
    cell: ({ row }) => formatAppDate(row.original.timestamp),
  },
  {
    accessorKey: "type",
    header: "Tipo de Evento",
    cell: ({ row }) => getEventTypeBadge(row.original.type),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
    {
    accessorKey: "campaignId",
    header: "Campaña ID",
  },
  {
    accessorKey: "provider",
    header: "Proveedor",
  },
];

export default function WebhooksLogsPage() {
    const { data, isLoading, isError } = useWebhookEvents();

    return (
        <>
            <PageHeader
                title="Logs de Webhooks"
                description="Registros de eventos de entrega de correos electrónicos."
            />
            <Card>
                <CardContent className="p-0">
                    {isLoading && <div className="p-4"><Skeleton className="h-64 w-full" /></div>}
                    {isError && <div>Error al cargar los logs.</div>}
                    {data && <DataTable columns={columns} data={data} filterColumnId="email" filterPlaceholder="Filtrar por email..." />}
                </CardContent>
            </Card>
        </>
    );
}
