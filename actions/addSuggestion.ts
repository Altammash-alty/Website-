"use server"

import { db } from "@/lib/db/db"
import { suggestionTable } from "@/lib/db/schema"

interface DataType {
  name: string,
  suggestion: string
}

export async function addSuggestions(formData: DataType) {
  try {
    const result = await db
      .insert(suggestionTable)
      .values({
        name: formData.name,
        suggestion: formData.suggestion
      })
    return { success: true, data: result }
  } catch (error) {
    console.log(error)
    return { success: false, data: "Failed to submit review !" }
  }
}
