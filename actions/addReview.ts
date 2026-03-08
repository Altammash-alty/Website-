"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db/db"
import { reviewTable } from "@/lib/db/schema"

export async function addReview(review: string, projectId: string) {

  const session = await auth()

  try {
    const result = await db
      .insert(reviewTable)
      .values({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        projectId: projectId,
        review,
      })
    return { success: true, data: result }
  } catch (error) {
    console.log(error)
    return { success: false, data: "Failed to submit review !" }
  }
}
