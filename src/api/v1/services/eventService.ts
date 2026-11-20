import { Event, CreateEventInput } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EVENTS_COLLECTION = "events";

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
    const snapshot = await firestoreRepository.getDocuments(
        EVENTS_COLLECTION
    );

    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    } as Event));
};

// Get event by ID
export const getEventById = async (
    id: string
): Promise<Event | null> => {
    const document = await firestoreRepository.getDocumentById(
        EVENTS_COLLECTION,
        id
    );

    if (!document) {
        return null;
    }

    return {
        ...document.data(),
        id: document.id,
    } as Event;
};

// Create event
export const createEvent = async (
    input: CreateEventInput
): Promise<Event> => {
    const now = new Date().toISOString();

    const eventData: Omit<Event, "id"> = {
        name: input.name,
        date: input.date,
        capacity: input.capacity,
        registrationCount: input.registrationCount ?? 0,
        status: input.status ?? "active",
        category: input.category ?? "general",
        createdAt: now,
        updatedAt: now,
    };

    const id = await firestoreRepository.createDocument<Event>(
        EVENTS_COLLECTION,
        eventData
    );

    return {
        id,
        ...eventData,
    };
};

// Update event
export const updateEvent = async (
    id: string,
    updates: Partial<CreateEventInput>
): Promise<Event | null> => {
    const existingEvent = await getEventById(id);

    if (!existingEvent) {
        return null;
    }

    const capacity = updates.capacity ?? existingEvent.capacity;
    const registrationCount =
        updates.registrationCount ?? existingEvent.registrationCount;

    if (registrationCount > capacity) {
        throw new RangeError(
            "Registration count cannot exceed capacity"
        );
    }

    const updatedData: Partial<Event> = {
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    await firestoreRepository.updateDocument<Event>(
        EVENTS_COLLECTION,
        id,
        updatedData
    );

    return {
        ...existingEvent,
        ...updatedData,
    };
};

// Delete event
export const deleteEvent = async (
    id: string
): Promise<boolean> => {
    const existingEvent = await getEventById(id);

    if (!existingEvent) {
        return false;
    }

    await firestoreRepository.deleteDocument(
        EVENTS_COLLECTION,
        id
    );

    return true;
};