import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { SchoolService } from '../services/school.service';
import { AppError } from '../utils/errors';

const service = new SchoolService(AppDataSource);

export const addSchool = async (req: Request, res: Response) => {
    try {
        const payload = {
            name: req.body.name,
            address: req.body.address,
            latitude: Number(req.body.latitude),
            longitude: Number(req.body.longitude)
        };
        const saved = await service.addSchool(payload);
        return res.status(201).json({ message: 'School created', data: saved });
    } catch (err: any) {
        if (err instanceof AppError) return res.status(err.status).json({ code: err.code, message: err.message });
        console.error(err);
        return res.status(500).json({ code: 'INTERNAL', message: 'Something went wrong' });
    }
};

export const listSchools = async (req: Request, res: Response) => {
    try {
        const result = await service.listSchools({
            userLat: Number(req.query.lat),
            userLng: Number(req.query.lng),
            search: (req.query.search as string) || undefined,
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            orderBy: (req.query.orderBy as any) || 'distance',
            orderDir: (req.query.orderDir as any) || 'ASC'
        });
        return res.json(result);
    } catch (err: any) {
        if (err instanceof AppError) return res.status(err.status).json({ code: err.code, message: err.message });
        console.error(err);
        return res.status(500).json({ code: 'INTERNAL', message: 'Something went wrong' });
    }
};
