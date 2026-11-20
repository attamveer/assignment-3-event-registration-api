import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Event, CreateEventInput } from "../models/eventModel";

// Get all events
export const getAllEvents = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: Event[] = await eventService.getAllEvents();

        res.status(HTTP_STATUS.OK).json({
            message: "Events retrieved",
            count: events.length,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

// Get event by ID
export const getEventById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const event: Event | null =
            await eventService.getEventById(req.params.id);

        if (!event) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Event retrieved",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// Create event
export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const event: Event = await eventService.createEvent(
            req.body as CreateEventInput
        );

        res.status(HTTP_STATUS.CREATED).json({
            message: "Event created",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// Update event
export const updateEvent = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const event: Event | null = await eventService.updateEvent(
            req.params.id,
            req.body
        );

        if (!event) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Event updated",
            data: event,
        });
    } catch (error) {
        if (error instanceof RangeError) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: error.message,
            });
            return;
        }

        next(error);
    }
};

// Delete event
export const deleteEvent = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted: boolean =
            await eventService.deleteEvent(req.params.id);

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Event deleted",
        });
    } catch (error) {
        next(error);
    }
};