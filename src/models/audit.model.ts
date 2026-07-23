export type AuditStatus = 'open' | 'in_progress' | 'closed';

export interface Audit {
    id: string;
    title: string;

    punto: string | null;

    process: string | null;

    objective: string | null;

    scope: string | null;

    criteria: string | null;

    status: AuditStatus;

    start_date: string | null;

    end_date: string | null;

    lead_user_id: string | null;

    created_by: string | null;

    created_at: string;
}

export interface CreateAuditDto {
    title: string;
    punto?: string | null;
    process?: string | null;
    objective?: string | null;
    scope?: string | null;
    criteria?: string | null;
    status?: AuditStatus;
    start_date?: string | null;
    end_date?: string | null;
    lead_user_id?: string | null;
    created_by?: string | null;
}

export interface UpdateAuditDto {
    title?: string;
    punto?: string | null;
    process?: string | null;
    objective?: string | null;
    scope?: string | null;
    criteria?: string | null;
    status?: AuditStatus;
    start_date?: string | null;
    end_date?: string | null;
    lead_user_id?: string | null;
}
