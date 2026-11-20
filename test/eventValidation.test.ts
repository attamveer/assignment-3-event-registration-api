import { createEventSchema } from "../src/api/v1/validation/eventValidation";
import { CreateEventInput } from "../src/api/v1/models/eventModel";

describe("Create Event Validation", () => {

    const validEvent = (): CreateEventInput => ({
        name: "Developer Conference",
        date: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        capacity: 100,
    });

    it("should accept valid event data and apply defaults", () => {
        // Arrange
        const input: CreateEventInput = validEvent();

        // Act
        const { error, value } = createEventSchema.validate(input);

        // Assert
        expect(error).toBeUndefined();
        expect(value.registrationCount).toBe(0);
        expect(value.status).toBe("active");
        expect(value.category).toBe("general");
    });

    it("should reject an event without a name", () => {
        // Arrange
        const input: Partial<CreateEventInput> = {
            date: validEvent().date,
            capacity: 100,
        };

        // Act
        const { error } = createEventSchema.validate(input);

        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].message).toContain(
            '"name" is required'
        );
    });

    it("should reject an invalid date format", () => {
        // Arrange
        const input: CreateEventInput = {
            ...validEvent(),
            date: "invalid-date",
        };

        // Act
        const { error } = createEventSchema.validate(input);

        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].message).toContain("ISO");
    });

    it("should reject registration counts exceeding capacity", () => {
        // Arrange
        const input: CreateEventInput = {
            ...validEvent(),
            capacity: 10,
            registrationCount: 15,
        };

        // Act
        const { error } = createEventSchema.validate(input);

        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].path).toContain(
            "registrationCount"
        );
    });

});