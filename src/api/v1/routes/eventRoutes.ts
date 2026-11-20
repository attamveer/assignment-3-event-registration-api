import express from "express";
import * as eventController from "../controllers/eventController";
import {
    validateCreateEvent,
    validateUpdateEvent,
} from "../middleware/validateEvent";

const router = express.Router();

// Get all events
router.get("/", eventController.getAllEvents);

// Get event by ID
router.get("/:id", eventController.getEventById);

// Create event
router.post(
    "/",
    validateCreateEvent,
    eventController.createEvent
);

// Update event
router.put(
    "/:id",
    validateUpdateEvent,
    eventController.updateEvent
);

// Delete event
router.delete("/:id", eventController.deleteEvent);

export default router;