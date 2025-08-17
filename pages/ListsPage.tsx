import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { DataTable } from '../components/shared/DataTable';
import { MailingList } from '../lib/types';
import { useLists } from '../services/api';
import PageHeader from '../components/shared/PageHeader';
import { formatAppDate } from '../lib/utils';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';

const columns: ColumnDef<MailingList>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "counts.total",
    header: "Contactos",
    cell: ({ row }) => row.original.counts.total.toLocaleString('es-CL'),
  },
    {
    accessorKey: "counts.valid",
    header: "Válidos",
    cell: ({ row }) => row.original.counts.valid.toLocaleString('es-CL'),
  },
  {
    accessorKey: "counts.bounced",
    header: "Rebotados",
    cell: ({ row }) => row.original.counts.bounced.toLocaleString('es-CL'),
  },
  {
    accessorKey: "createdAt",
    header: "Creada",
    cell: ({ row }) => formatAppDate(row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const list = row.original;
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(list.id)}>
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver Contactos</DropdownMenuItem>
            <DropdownMenuItem>Exportar CSV</DropdownMenuItem>
             <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ListsPageLoading = () => (
    <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
    </div>
);


export default function ListsPage() {
    const { data: lists, isLoading, isError } = useLists();

    return (
        <>
            <PageHeader
                title="Listas de Contactos"
                description="Administra tus listas de suscriptores."
            >
                <Button>Importar Contactos</Button>
                <Button variant="accent">Nueva Lista</Button>
            </PageHeader>
            <Card>
                <CardContent className="p-0">
                    {isLoading && <ListsPageLoading />}
                    {isError && <div>Error al cargar las listas.</div>}
                    {lists && <DataTable columns={columns} data={lists} filterColumnId="name" filterPlaceholder="Filtrar por nombre..." />}
                </CardContent>
            </Card>
        </>
    );
}