
"use server";

import { db } from "@/lib/db/db";
import { projectsTable } from "@/lib/db/schema";

export async function fetchProjects() {
  return await db.select().from(projectsTable);
}
