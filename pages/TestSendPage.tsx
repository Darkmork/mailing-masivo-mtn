
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useTemplates, useSendTestEmail } from '../services/api';
import PageHeader from '../components/shared/PageHeader';
import { useToast } from '../components/ui/use-toast';
import { Send } from 'lucide-react';

const testSendSchema = z.object({
  to: z.string().email({ message: "Debe ser un correo válido." }),
  templateId: z.string().min(1, { message: "Debes seleccionar una plantilla." }),
  data: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Debe ser un JSON válido." }),
});

type TestSendData = z.infer<typeof testSendSchema>;

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
    return (
        <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ref={ref}
            {...props}
        />
    )
});

export default function TestSendPage() {
    const { data: templates, isLoading: isLoadingTemplates } = useTemplates();
    const { toast } = useToast();
    const sendTestEmailMutation = useSendTestEmail();
    const { control, handleSubmit, formState: { errors } } = useForm<TestSendData>({
        resolver: zodResolver(testSendSchema),
        defaultValues: {
            to: '',
            templateId: '',
            data: '{\n  "Nombre": "Juanito",\n  "Curso": "8vo Básico A"\n}'
        }
    });

    const onSubmit = (data: TestSendData) => {
        sendTestEmailMutation.mutate(data, {
            onSuccess: () => {
                toast({
                    title: "Envío de prueba exitoso",
                    description: `El correo de prueba ha sido enviado a ${data.to}.`,
                });
            },
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error en el envío",
                    description: error.message,
                });
            }
        });
    };
    
    return (
        <>
            <PageHeader
                title="Envío de Prueba"
                description="Verifica cómo se ven tus plantillas antes del envío masivo."
            />
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Enviar Correo de Prueba</CardTitle>
                    <CardDescription>Selecciona una plantilla, ingresa un destinatario y proporciona datos de prueba en formato JSON.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="to" className="block text-sm font-medium mb-1">Para:</label>
                            <Controller name="to" control={control} render={({ field }) => <Input {...field} id="to" placeholder="destinatario@ejemplo.com" />} />
                            {errors.to && <p className="text-sm text-red-600 mt-1">{errors.to.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="templateId" className="block text-sm font-medium mb-1">Plantilla:</label>
                             <Controller name="templateId" control={control} render={({ field }) => (
                                <select {...field} id="templateId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="" disabled>Selecciona una plantilla</option>
                                    {isLoadingTemplates ? <option>Cargando...</option> : templates?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            )} />
                            {errors.templateId && <p className="text-sm text-red-600 mt-1">{errors.templateId.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="data" className="block text-sm font-medium mb-1">Datos de Prueba (JSON):</label>
                            <Controller name="data" control={control} render={({ field }) => <Textarea {...field} id="data" rows={8} />} />
                            {errors.data && <p className="text-sm text-red-600 mt-1">{errors.data.message}</p>}
                        </div>
                        <Button type="submit" variant="accent" disabled={sendTestEmailMutation.isPending}>
                            <Send className="mr-2 h-4 w-4"/>
                            {sendTestEmailMutation.isPending ? 'Enviando...' : 'Enviar Prueba'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
