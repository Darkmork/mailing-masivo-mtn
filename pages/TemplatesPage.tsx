
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTemplates } from '../services/api';
import PageHeader from '../components/shared/PageHeader';
import { formatAppDate } from '../lib/utils';
import { Skeleton } from '../components/ui/skeleton';
import { Edit, Copy, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const TemplateCard = ({ template }: { template: import('../lib/types').EmailTemplate }) => (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.subject}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-4">
                    <p className="text-sm text-muted-foreground italic text-center">Vista previa no disponible</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Actualizado: {formatAppDate(template.updatedAt)}</p>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
            </CardFooter>
        </Card>
    </motion.div>
);

const TemplatesPageLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-32 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-4 w-1/2" />
                </CardFooter>
            </Card>
        ))}
    </div>
);

export default function TemplatesPage() {
    const { data: templates, isLoading, isError } = useTemplates();
    return (
        <>
            <PageHeader
                title="Plantillas de Correo"
                description="Crea y gestiona tus plantillas para las campañas."
            >
                <Button variant="accent">Nueva Plantilla</Button>
            </PageHeader>
            
            {isLoading && <TemplatesPageLoading />}
            {isError && <div>Error al cargar las plantillas.</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates?.map(template => <TemplateCard key={template.id} template={template} />)}
            </div>
        </>
    );
}
