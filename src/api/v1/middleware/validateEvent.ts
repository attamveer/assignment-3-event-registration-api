import { Request, Response, NextFunction } from "express";
import {
    createEventSchema,
    updateEventSchema,
} from "../validation/eventValidation";

export const validateCreateEvent = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error, value } = createEventSchema.validate(req.body);

    if (error) {
        res.status(400).json({
            message: `Validation error: ${error.details[0].message}`,
        });

        return;
    }

    req.body = {
        ...value,
        date: value.date.toISOString(),
    };

    next();
};

export const validateUpdateEvent = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error, value } = updateEventSchema.validate(req.body);

    if (error) {
        res.status(400).json({
            message: `Validation error: ${error.details[0].message}`,
        });
        return;
    }

    req.body = {
        ...value,
        ...(value.date
            ? { date: value.date.toISOString() }
            : {}),
    };

    next();
};