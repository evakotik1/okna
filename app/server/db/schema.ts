import { varchar, text, timestamp, boolean, pgTable, integer } from "drizzle-orm/pg-core"
export * from "./auth-schema"

export const commonFields = {
	id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => Bun.randomUUIDv7()),

	deletedAt: timestamp("deleted_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}


// export const users = pgTable("users", {
// 	...commonFields,
// 	name: varchar({length: 255}).notNull(),
// 	email: varchar({ length: 255 }).notNull().unique(),
//     phone: varchar({ length: 255 }).notNull(),
// })


export const measurement = pgTable("measurement", {
    ...commonFields,

    name: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    consent: boolean().default(false).notNull(),
    status: varchar('status', { length: 50 }).default('new'),

});



export const calculation = pgTable("calculation", {
    ...commonFields,

    name: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    consent: boolean().default(false).notNull(),
    status: varchar('status', { length: 50 }).default('new'),
});


export const reviews = pgTable("reviews", {
    ...commonFields,

    name: varchar({ length: 255 }).notNull(),
    contractNumber: varchar("contract_number", { length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    review: text("review").notNull(),
    consent: boolean().default(false).notNull(),
    status: varchar('status', { length: 50 }).default('new'),
});


export const questions = pgTable("questions", {
    ...commonFields,

    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    message: text("message").notNull(),
    consent: boolean().default(false).notNull(),
    status: varchar('status', { length: 50 }).default('new'),
});





// export const usersRelations = relations(users, ({ many }) => ({
// 	measurements: many(measurement),
// 	calculations: many(calculation),
// 	reviews: many(reviews),
// 	questions: many(questions),
// }));

// export const measurementRelations = relations(measurement, ({ one }) => ({
// 	user: one(users, {
// 		fields: [measurement.userId],
// 		references: [users.id]
// 	}),
// }));

// export const calculationRelations = relations(calculation, ({ one }) => ({
// 	user: one(users, {
// 		fields: [calculation.userId],
// 		references: [users.id]
// 	}),
// }));

// export const reviewsRelations = relations(reviews, ({ one }) => ({
// 	user: one(users, {
// 		fields: [reviews.userId],
// 		references: [users.id]
// 	}),
// }));

// export const questionsRelations = relations(questions, ({ one }) => ({
// 	user: one(users, {
// 		fields: [questions.userId],
// 		references: [users.id]
// 	}),
// }));





export const files = pgTable("files", {
    ...commonFields,
    
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileSize: integer("file_size").notNull(),
    placeholder: text("placeholder"), // ← СЮДА S3 URL!
    contentType: varchar("content_type", { length: 255 }).notNull(),
});



export const products = pgTable("products", {
    ...commonFields,
    
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    file: varchar("file", { length: 255 }).references(() => files.id),
});

export const services = pgTable("services", {
    ...commonFields,
    
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    file: varchar("file", { length: 255 }).references(() => files.id),
});