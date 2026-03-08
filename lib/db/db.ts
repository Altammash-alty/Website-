import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === "production") {
    console.warn("WARNING: DATABASE_URL is not set. Database features will fail.");
}

let db: any;

try {
    const sql = neon(databaseUrl || "postgresql://placeholder:placeholder@localhost:5432/postgres");
    db = drizzle({ client: sql });
} catch (error) {
    console.error("Failed to initialize database:", error);
    // Export a dummy object to prevent immediate crashes, though queries will still fail.
    db = {
        select: () => ({ from: () => ({ where: () => [] }) }),
        insert: () => ({ values: () => [] }),
        update: () => ({ set: () => ({ where: () => [] }) }),
        delete: () => ({ where: () => [] }),
    };
}

export { db };
