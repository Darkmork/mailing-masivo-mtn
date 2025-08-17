import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useDashboardStats } from '../services/api';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowUpRight, BarChart, CheckCircle, Mail, AlertTriangle, ShieldX } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import PageHeader from '../components/shared/PageHeader';
import { cn } from '../lib/utils';

const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string, value: string, icon: React.ElementType, change?: string, changeType?: 'increase' | 'decrease' }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
                <p className="text-xs text-muted-foreground">
                    <span className={cn("font-semibold", changeType === 'increase' ? "text-green-600" : "text-red-600")}>
                        {change}
                    </span>
                    {" "}vs. último mes
                </p>
            )}
        </CardContent>
    </Card>
);

const DashboardLoading = () => (
    <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
                 <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-32 mb-2" />
                        <Skeleton className="h-4 w-40" />
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
            <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="pl-2">
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-3">
                 <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="pl-2">
                     <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
        </div>
    </>
);

export default function DashboardPage() {
    const { data: stats, isLoading, isError } = useDashboardStats();
    
    if (isLoading) return <DashboardLoading />;
    if (isError || !stats) return <div>Error al cargar las estadísticas.</div>;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Resumen de la actividad de mailing del colegio."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Enviados" value={stats.totalSent.toLocaleString('es-CL')} icon={Mail} change="+12.5%" changeType="increase" />
        <StatCard title="Tasa de Entrega" value={`${stats.deliveryRate}%`} icon={CheckCircle} />
        <StatCard title="Tasa de Apertura" value={`${stats.openRate}%`} icon={ArrowUpRight} />
        <StatCard title="Tasa de Rebote" value={`${stats.bounceRate}%`} icon={AlertTriangle} />
        <StatCard title="Reportes de Spam" value={`${stats.spamRate}%`} icon={ShieldX} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
                <CardTitle>Envíos en los Últimos 7 Días</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={stats.sendsOverTime}>
                        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => new Date(value).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" name="Envíos" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Tasas por Categoría de Campaña</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <RechartsBarChart data={stats.ratesByCategory}>
                        <XAxis dataKey="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="openRate" name="Apertura (%)" fill="hsl(var(--primary-600))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="bounceRate" name="Rebote (%)" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </>
  );
}