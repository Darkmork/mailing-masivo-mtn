
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MOCK_LISTS, MOCK_TEMPLATES, MOCK_CAMPAIGNS, MOCK_WEBHOOKS, MOCK_CONTACTS } from '../lib/constants';
import { MailingList, EmailTemplate, Campaign, WebhookEvent, Contact } from '../lib/types';

// Axios setup (can be expanded with interceptors)
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || '/api', // Mock base URL
});

// --- API Functions (mocked) ---

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Lists
export const useLists = () => useQuery<MailingList[], Error>({
  queryKey: ['lists'],
  queryFn: async () => {
    await sleep(500);
    return MOCK_LISTS;
  }
});
export const useListContacts = (listId: string) => useQuery<Contact[], Error>({
    queryKey: ['contacts', listId],
    queryFn: async () => {
        await sleep(500);
        return MOCK_CONTACTS;
    },
    enabled: !!listId,
});


// Templates
export const useTemplates = () => useQuery<EmailTemplate[], Error>({
  queryKey: ['templates'],
  queryFn: async () => {
    await sleep(500);
    return MOCK_TEMPLATES;
  }
});

// Campaigns
export const useCampaigns = () => useQuery<Campaign[], Error>({
  queryKey: ['campaigns'],
  queryFn: async () => {
    await sleep(500);
    return MOCK_CAMPAIGNS;
  }
});
export const useCampaign = (id: string) => useQuery<Campaign, Error>({
    queryKey: ['campaign', id],
    queryFn: async () => {
        await sleep(500);
        const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);
        if (!campaign) throw new Error("Campaign not found");
        // Simulate progress for running campaign
        if (campaign.status === 'RUNNING') {
            campaign.stats.sent = Math.min(campaign.stats.total, campaign.stats.sent + Math.floor(Math.random() * 50));
            campaign.stats.delivered = Math.floor(campaign.stats.sent * 0.98);
        }
        return campaign;
    },
    enabled: !!id,
    refetchInterval: (query) => {
        const campaign = query.state.data;
        return campaign?.status === 'RUNNING' ? 5000 : false;
    },
});


// Test Email
export const useSendTestEmail = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { to: string, templateId: string, data: string }>({
        mutationFn: async (vars) => {
            console.log('Sending test email:', vars);
            await sleep(1000);
            if (vars.to.includes('fail')) {
                throw new Error("Simulated API error: Dirección de correo inválida.");
            }
        },
    });
};


// Webhooks
export const useWebhookEvents = () => useQuery<WebhookEvent[], Error>({
  queryKey: ['webhookEvents'],
  queryFn: async () => {
    await sleep(800);
    return MOCK_WEBHOOKS;
  }
});

// Dashboard Stats
export const useDashboardStats = () => useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
        await sleep(700);
        return {
            totalSent: 10520,
            deliveryRate: 98.5,
            openRate: 45.2,
            bounceRate: 1.2,
            spamRate: 0.3,
            sendsOverTime: [
                { date: '2024-05-01', count: 1200 },
                { date: '2024-05-02', count: 1500 },
                { date: '2024-05-03', count: 1300 },
                { date: '2024-05-04', count: 1800 },
                { date: '2024-05-05', count: 1600 },
                { date: '2024-05-06', count: 2100 },
                { date: '2024-05-07', count: 2020 },
            ],
            ratesByCategory: [
                { category: 'Comunicados', openRate: 55, bounceRate: 0.8 },
                { category: 'Newsletters', openRate: 38, bounceRate: 1.5 },
                { category: 'Eventos', openRate: 65, bounceRate: 0.5 },
            ]
        }
    }
});
