import * as eventService from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Event } from "../src/api/v1/models/eventModel";

// Mock repository operations
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Event Service", () => {

    const eventData: Omit<Event, "id"> = {
        name: "Developer Conference",
        date: "2027-07-15T09:00:00.000Z",
        capacity: 100,
        registrationCount: 20,
        status: "active",
        category: "conference",
        createdAt: "2026-11-19T10:00:00.000Z",
        updatedAt: "2026-11-19T10:00:00.000Z",
    };

    const mockDocument = {
        id: "event-1",
        data: () => eventData,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should retrieve all events", async () => {
        // Arrange
        (firestoreRepository.getDocuments as jest.Mock)
            .mockResolvedValue({
                docs: [mockDocument],
            });

        // Act
        const result = await eventService.getAllEvents();

        // Assert
        expect(firestoreRepository.getDocuments)
            .toHaveBeenCalledWith("events");

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("event-1");
    });

    it("should retrieve an event by ID", async () => {
        // Arrange
        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue(mockDocument);

        // Act
        const result = await eventService.getEventById("event-1");

        // Assert
        expect(firestoreRepository.getDocumentById)
            .toHaveBeenCalledWith("events", "event-1");

        expect(result?.name).toBe("Developer Conference");
    });

    it("should create a new event", async () => {
        // Arrange
        (firestoreRepository.createDocument as jest.Mock)
            .mockResolvedValue("event-1");

        const input = {
            name: "Developer Conference",
            date: "2027-07-15T09:00:00.000Z",
            capacity: 100,
        };

        // Act
        const result = await eventService.createEvent(input);

        // Assert
        expect(firestoreRepository.createDocument)
            .toHaveBeenCalledWith(
                "events",
                expect.objectContaining({
                    name: input.name,
                    capacity: 100,
                })
            );

        expect(result.id).toBe("event-1");
        expect(result.status).toBe("active");
    });

    it("should update an existing event", async () => {
        // Arrange
        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue(mockDocument);

        (firestoreRepository.updateDocument as jest.Mock)
            .mockResolvedValue(undefined);

        // Act
        const result = await eventService.updateEvent(
            "event-1",
            { capacity: 150 }
        );

        // Assert
        expect(firestoreRepository.updateDocument)
            .toHaveBeenCalledWith(
                "events",
                "event-1",
                expect.objectContaining({
                    capacity: 150,
                })
            );

        expect(result?.capacity).toBe(150);
    });

    it("should delete an existing event", async () => {
        // Arrange
        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue(mockDocument);

        (firestoreRepository.deleteDocument as jest.Mock)
            .mockResolvedValue(undefined);

        // Act
        const result = await eventService.deleteEvent("event-1");

        // Assert
        expect(firestoreRepository.deleteDocument)
            .toHaveBeenCalledWith("events", "event-1");

        expect(result).toBe(true);
    });

});