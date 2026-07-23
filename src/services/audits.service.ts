import { AuditsRepository } from '../repositories/audits.repository.js';
import type { Audit, CreateAuditDto, UpdateAuditDto } from '../models/audit.model.js';
import { NotFoundError, ValidationError } from '../utils/app-error.js';
import { isValidUuid } from '../utils/uuid.js';
import {
    isNonEmptyString,
    isNullableString,
    isValidAuditStatus,
    isValidDateString
} from '../utils/validation.js';

export class AuditsService {

    private repository = new AuditsRepository();

    async getAll() {
        return await this.repository.findAll();
    }

    async getById(id: string): Promise<Audit> {

        if (!id || !id.trim()) {
            throw new ValidationError('El ID de la auditoría es obligatorio');
        }

        if (!isValidUuid(id)) {
            throw new ValidationError('El ID de la auditoría no es válido');
        }

        const audit = await this.repository.findById(id);

        if (!audit) {
            throw new NotFoundError('Auditoría no encontrada');
        }

        return audit;
    }

    async create(payload: CreateAuditDto): Promise<Audit> {

        const validatedPayload = this.validateCreatePayload(payload);

        return await this.repository.create(validatedPayload);
    }

    async update(id: string, payload: UpdateAuditDto): Promise<Audit> {

        await this.getById(id);

        const validatedPayload = this.validateUpdatePayload(payload);

        return await this.repository.update(id, validatedPayload);
    }

    async delete(id: string): Promise<void> {

        await this.getById(id);

        await this.repository.delete(id);
    }

    private validateCreatePayload(payload: CreateAuditDto): CreateAuditDto {

        if (!payload || typeof payload !== 'object') {
            throw new ValidationError('El cuerpo de la solicitud es inválido');
        }

        if (!isNonEmptyString(payload.title)) {
            throw new ValidationError('El título es obligatorio');
        }

        if (payload.status !== undefined && !isValidAuditStatus(payload.status)) {
            throw new ValidationError('El estado debe ser open, in_progress o closed');
        }

        if (payload.punto !== undefined && !isNullableString(payload.punto)) {
            throw new ValidationError('El punto debe ser un texto válido');
        }

        if (payload.process !== undefined && !isNullableString(payload.process)) {
            throw new ValidationError('El proceso debe ser un texto válido');
        }

        if (payload.objective !== undefined && !isNullableString(payload.objective)) {
            throw new ValidationError('El objetivo debe ser un texto válido');
        }

        if (payload.scope !== undefined && !isNullableString(payload.scope)) {
            throw new ValidationError('El alcance debe ser un texto válido');
        }

        if (payload.criteria !== undefined && !isNullableString(payload.criteria)) {
            throw new ValidationError('El criterio debe ser un texto válido');
        }

        if (payload.start_date !== undefined && payload.start_date !== null) {
            if (!isValidDateString(payload.start_date)) {
                throw new ValidationError('La fecha de inicio debe tener el formato YYYY-MM-DD');
            }
        }

        if (payload.end_date !== undefined && payload.end_date !== null) {
            if (!isValidDateString(payload.end_date)) {
                throw new ValidationError('La fecha de fin debe tener el formato YYYY-MM-DD');
            }
        }

        if (payload.start_date && payload.end_date) {
            if (payload.end_date < payload.start_date) {
                throw new ValidationError('La fecha de fin no puede ser anterior a la fecha de inicio');
            }
        }

        if (payload.lead_user_id !== undefined && payload.lead_user_id !== null) {
            if (!isValidUuid(payload.lead_user_id)) {
                throw new ValidationError('El lead_user_id no es un UUID válido');
            }
        }

        if (payload.created_by !== undefined && payload.created_by !== null) {
            if (!isValidUuid(payload.created_by)) {
                throw new ValidationError('El created_by no es un UUID válido');
            }
        }

        return {
            title: payload.title.trim(),
            punto: payload.punto ?? null,
            process: payload.process ?? null,
            objective: payload.objective ?? null,
            scope: payload.scope ?? null,
            criteria: payload.criteria ?? null,
            status: payload.status ?? 'open',
            start_date: payload.start_date ?? null,
            end_date: payload.end_date ?? null,
            lead_user_id: payload.lead_user_id ?? null,
            created_by: payload.created_by ?? null
        };
    }

    private validateUpdatePayload(payload: UpdateAuditDto): UpdateAuditDto {

        if (!payload || typeof payload !== 'object') {
            throw new ValidationError('El cuerpo de la solicitud es inválido');
        }

        const fields: (keyof UpdateAuditDto)[] = [
            'title',
            'punto',
            'process',
            'objective',
            'scope',
            'criteria',
            'status',
            'start_date',
            'end_date',
            'lead_user_id'
        ];

        const hasAtLeastOneField = fields.some((field) => payload[field] !== undefined);

        if (!hasAtLeastOneField) {
            throw new ValidationError('Debe enviar al menos un campo para actualizar');
        }

        const validated: UpdateAuditDto = {};

        if (payload.title !== undefined) {
            if (!isNonEmptyString(payload.title)) {
                throw new ValidationError('El título no puede estar vacío');
            }
            validated.title = payload.title.trim();
        }

        if (payload.status !== undefined) {
            if (!isValidAuditStatus(payload.status)) {
                throw new ValidationError('El estado debe ser open, in_progress o closed');
            }
            validated.status = payload.status;
        }

        if (payload.punto !== undefined) {
            if (!isNullableString(payload.punto)) {
                throw new ValidationError('El punto debe ser un texto válido');
            }
            validated.punto = payload.punto;
        }

        if (payload.process !== undefined) {
            if (!isNullableString(payload.process)) {
                throw new ValidationError('El proceso debe ser un texto válido');
            }
            validated.process = payload.process;
        }

        if (payload.objective !== undefined) {
            if (!isNullableString(payload.objective)) {
                throw new ValidationError('El objetivo debe ser un texto válido');
            }
            validated.objective = payload.objective;
        }

        if (payload.scope !== undefined) {
            if (!isNullableString(payload.scope)) {
                throw new ValidationError('El alcance debe ser un texto válido');
            }
            validated.scope = payload.scope;
        }

        if (payload.criteria !== undefined) {
            if (!isNullableString(payload.criteria)) {
                throw new ValidationError('El criterio debe ser un texto válido');
            }
            validated.criteria = payload.criteria;
        }

        if (payload.start_date !== undefined) {
            if (payload.start_date !== null && !isValidDateString(payload.start_date)) {
                throw new ValidationError('La fecha de inicio debe tener el formato YYYY-MM-DD');
            }
            validated.start_date = payload.start_date;
        }

        if (payload.end_date !== undefined) {
            if (payload.end_date !== null && !isValidDateString(payload.end_date)) {
                throw new ValidationError('La fecha de fin debe tener el formato YYYY-MM-DD');
            }
            validated.end_date = payload.end_date;
        }

        if (payload.start_date && payload.end_date) {
            if (payload.end_date < payload.start_date) {
                throw new ValidationError('La fecha de fin no puede ser anterior a la fecha de inicio');
            }
        }

        if (payload.lead_user_id !== undefined) {
            if (payload.lead_user_id !== null && !isValidUuid(payload.lead_user_id)) {
                throw new ValidationError('El lead_user_id no es un UUID válido');
            }
            validated.lead_user_id = payload.lead_user_id;
        }

        return validated;
    }

}
