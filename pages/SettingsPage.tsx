
import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Configuración"
        description="Ajustes generales de la aplicación y proveedores de correo."
      />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración SMTP</CardTitle>
            <CardDescription>Datos de conexión para el envío de correos. (Funcionalidad no implementada en esta demo)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Proveedor</label>
                <Input value="SendGrid (Simulado)" disabled />
              </div>
               <div>
                <label className="text-sm font-medium">API Key</label>
                <Input type="password" value="********************************" disabled />
              </div>
               <div>
                <label className="text-sm font-medium">Dominio de Envío</label>
                <Input value="mtn.cl" disabled />
              </div>
               <Button disabled>Guardar Cambios</Button>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Políticas de Desuscripción</CardTitle>
            <CardDescription>Configura cómo los usuarios pueden darse de baja.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Lista de Exclusión Global</label>
                <Input value="No_Enviar (Simulado)" disabled />
              </div>
               <div>
                <label className="text-sm font-medium">Texto de pie de página para desuscripción</label>
                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" disabled>
                    Para dejar de recibir estos correos, responda a este mensaje con la palabra REMOVER en el asunto.
                </textarea>
              </div>
               <Button disabled>Guardar Cambios</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
