const AUDIT_STATUSES = ['open', 'in_progress', 'closed'] as const;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function isValidAuditStatus(value: string): value is 'open' | 'in_progress' | 'closed' {
    return (AUDIT_STATUSES as readonly string[]).includes(value);
}

export function isValidDateString(value: string): boolean {
    if (!DATE_REGEX.test(value)) {
        return false;
    }

    const date = new Date(`${value}T00:00:00.000Z`);

    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

export function isNullableString(value: unknown): value is string | null {
    return value === null || typeof value === 'string';
}
