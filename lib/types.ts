
export interface Contact {
  id: string;
  email: string;
  fields: Record<string, string | number | null>;
  status?: 'valid' | 'bounced' | 'unsub';
  createdAt: string;
}

export interface MailingList {
  id: string;
  name: string;
  counts: {
    total: number;
    valid: number;
    bounced: number;
    unsub: number;
  };
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  updatedAt: string;
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export interface Campaign {
  id: string;
  name: string;
  listId: string;
  templateId: string;
  status: CampaignStatus;
  stats: {
    total: number;
    sent: number;
    delivered: number;
    opened: number;
    bounced: number;
    spam: number;
  };
  createdAt: string;
}

export interface WebhookEvent {
  id: string;
  provider: string;
  type: 'delivered' | 'open' | 'bounce' | 'spam' | 'click';
  email: string;
  campaignId: string;
  timestamp: string;
  payload: Record<string, any>;
}
