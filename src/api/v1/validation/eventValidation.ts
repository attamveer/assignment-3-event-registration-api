import Joi, { ObjectSchema } from "joi";

export const createEventSchema: ObjectSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),

    date: Joi.date()
        .iso()
        .greater("now")
        .required(),

    capacity: Joi.number()
        .integer()
        .min(5)
        .required(),

    registrationCount: Joi.number()
        .integer()
        .max(Joi.ref("capacity"))
        .default(0),

    status: Joi.string()
        .valid("active", "cancelled", "completed")
        .default("active"),

    category: Joi.string()
        .valid(
            "conference",
            "workshop",
            "meetup",
            "seminar",
            "general"
        )
        .default("general"),
});

export const updateEventSchema: ObjectSchema = Joi.object({
    name: Joi.string()
        .min(3),

    date: Joi.date()
        .iso()
        .greater("now"),

    capacity: Joi.number()
        .integer()
        .min(5),

    registrationCount: Joi.number()
        .integer()
        .min(0),

    status: Joi.string()
        .valid("active", "cancelled", "completed"),

    category: Joi.string()
        .valid(
            "conference",
            "workshop",
            "meetup",
            "seminar",
            "general"
        ),
}).min(1);