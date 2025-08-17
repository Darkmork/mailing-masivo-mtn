
import { 
  LayoutDashboard, 
  List, 
  Mail, 
  Send, 
  Webhook, 
  Settings, 
  FileText 
} from 'lucide-react';
import { MailingList, EmailTemplate, Campaign, CampaignStatus, WebhookEvent, Contact } from './types';
import { subDays, subHours } from 'date-fns';

export const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lists', label: 'Listas', icon: List },
  { href: '/templates', label: 'Plantillas', icon: FileText },
  { href: '/campaigns', label: 'Campañas', icon: Send },
  { href: '/test-send', label: 'Envío de Prueba', icon: Mail },
  { href: '/webhooks-logs', label: 'Webhooks/Logs', icon: Webhook },
  { href: '/settings', label: 'Configuración', icon: Settings },
];

// MOCK DATA
const now = new Date();

export const MOCK_LISTS: MailingList[] = [
  { id: '1', name: 'Apoderados 2024', counts: { total: 1250, valid: 1245, bounced: 3, unsub: 2 }, createdAt: subDays(now, 5).toISOString() },
  { id: '2', name: 'Alumnos Media 2024', counts: { total: 430, valid: 430, bounced: 0, unsub: 0 }, createdAt: subDays(now, 10).toISOString() },
  { id: '3', name: 'Docentes y Administrativos', counts: { total: 150, valid: 149, bounced: 1, unsub: 0 }, createdAt: subDays(now, 25).toISOString() },
];

export const MOCK_TEMPLATES: EmailTemplate[] = [
  { id: 'tpl-1', name: 'Comunicado General', subject: 'Información Importante - Colegio MTN', html: '<h1>Hola {{Nombre}}</h1><p>Este es un comunicado del colegio.</p>', updatedAt: subDays(now, 2).toISOString() },
  { id: 'tpl-2', name: 'Newsletter Mensual', subject: 'Novedades de {{Mes}} en el MTN', html: '<h1>Noticias</h1><p>Contenido del newsletter...</p>', updatedAt: subDays(now, 15).toISOString() },
  { id: 'tpl-3', name: 'Invitación Evento', subject: 'Invitación a nuestro {{Evento}}', html: '<p>Te esperamos, {{Nombre}}!</p>', updatedAt: subHours(now, 6).toISOString() },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'camp-1', name: 'Comunicado Inicio de Clases', listId: '1', templateId: 'tpl-1', status: CampaignStatus.FINISHED, stats: { total: 1250, sent: 1250, delivered: 1240, opened: 980, bounced: 3, spam: 1 }, createdAt: subDays(now, 30).toISOString() },
  { id: 'camp-2', name: 'Actividades Extraprogramáticas', listId: '2', templateId: 'tpl-3', status: CampaignStatus.RUNNING, stats: { total: 430, sent: 215, delivered: 210, opened: 150, bounced: 0, spam: 0 }, createdAt: subDays(now, 1).toISOString() },
  { id: 'camp-3', name: 'Newsletter Abril', listId: '1', templateId: 'tpl-2', status: CampaignStatus.DRAFT, stats: { total: 1250, sent: 0, delivered: 0, opened: 0, bounced: 0, spam: 0 }, createdAt: subHours(now, 2).toISOString() },
];

export const MOCK_CONTACTS: Contact[] = [
    { id: 'c1', email: 'juan.perez@example.com', fields: { Nombre: 'Juan', Apellido: 'Perez', Curso: '8vo Básico A' }, status: 'valid', createdAt: subDays(now, 10).toISOString() },
    { id: 'c2', email: 'maria.gonzalez@example.com', fields: { Nombre: 'Maria', Apellido: 'Gonzalez', Curso: 'II Medio C' }, status: 'valid', createdAt: subDays(now, 12).toISOString() },
    { id: 'c3', email: 'pedro.rodriguez@example.com', fields: { Nombre: 'Pedro', Apellido: 'Rodriguez', Curso: 'Kinder A' }, status: 'bounced', createdAt: subDays(now, 5).toISOString() },
    { id: 'c4', email: 'ana.lopez@example.com', fields: { Nombre: 'Ana', Apellido: 'Lopez', Curso: '4to Básico B' }, status: 'unsub', createdAt: subDays(now, 20).toISOString() },
];

export const MOCK_WEBHOOKS: WebhookEvent[] = [
    { id: 'wh-1', provider: 'sendgrid', type: 'delivered', email: 'juan.perez@example.com', campaignId: 'camp-1', timestamp: subDays(now, 30).toISOString(), payload: { ip: '192.168.1.1' } },
    { id: 'wh-2', provider: 'sendgrid', type: 'open', email: 'maria.gonzalez@example.com', campaignId: 'camp-1', timestamp: subDays(now, 29).toISOString(), payload: { user_agent: 'Chrome' } },
    { id: 'wh-3', provider: 'sendgrid', type: 'bounce', email: 'pedro.rodriguez@example.com', campaignId: 'camp-1', timestamp: subDays(now, 30).toISOString(), payload: { reason: 'invalid mailbox' } },
];
