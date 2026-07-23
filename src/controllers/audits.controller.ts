import { Request, Response } from 'express';
import { AuditsService } from '../services/audits.service.js';
import { AppError } from '../utils/app-error.js';
import type { CreateAuditDto, UpdateAuditDto } from '../models/audit.model.js';

const service = new AuditsService();

export class AuditsController {

    async getAll(req: Request, res: Response) {

        try {

            const audits = await service.getAll();

            res.status(200).json(audits);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error obteniendo auditorías'
            });

        }

    }

    async getById(req: Request, res: Response) {

        try {

            const { id } = req.params;

            const audit = await service.getById(id);

            res.status(200).json({
                success: true,
                message: 'Auditoría obtenida correctamente',
                data: audit
            });

        } catch (error) {

            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    error: error.details ?? error.message
                });
                return;
            }

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Error obteniendo la auditoría',
                error: 'Error interno del servidor'
            });

        }

    }

    async create(req: Request, res: Response) {

        try {

            const payload = req.body as CreateAuditDto;

            const audit = await service.create(payload);

            res.status(201).json({
                success: true,
                message: 'Auditoría creada correctamente',
                data: audit
            });

        } catch (error) {

            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    error: error.details ?? error.message
                });
                return;
            }

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Error creando la auditoría',
                error: 'Error interno del servidor'
            });

        }

    }

    async update(req: Request, res: Response) {

        try {

            const { id } = req.params;
            const payload = req.body as UpdateAuditDto;

            const audit = await service.update(id, payload);

            res.status(200).json({
                success: true,
                message: 'Auditoría actualizada correctamente',
                data: audit
            });

        } catch (error) {

            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    error: error.details ?? error.message
                });
                return;
            }

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Error actualizando la auditoría',
                error: 'Error interno del servidor'
            });

        }

    }

    async delete(req: Request, res: Response) {

        try {

            const { id } = req.params;

            await service.delete(id);

            res.status(200).json({
                success: true,
                message: 'Auditoría eliminada correctamente',
                data: null
            });

        } catch (error) {

            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    error: error.details ?? error.message
                });
                return;
            }

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Error eliminando la auditoría',
                error: 'Error interno del servidor'
            });

        }

    }

}
