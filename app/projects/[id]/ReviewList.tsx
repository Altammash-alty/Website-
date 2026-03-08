import { Card } from '@/components/ui/card'
import { db } from '@/lib/db/db'
import { reviewTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import React from 'react'

const ReviewList = async ({ projectId }: { projectId: string | null }) => {

  const reviews = await db
    .select()
    .from(reviewTable)
    .where(eq(reviewTable.projectId, projectId as string))

  function extractNameFromEmail(email: string) {
    const name = email.split('@')[0];
    return name;
  }

  return (
    <div className="space-y-6">
      <span className='text-2xl text-white'>Reviews</span>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review.id} className="bg-white/5 border-none p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div className='flex gap-4 items-center'>
                <Image
                  src={review.image as string}
                  alt={review.name as string}
                  width={200}
                  height={200}
                  className='w-6 h-6 rounded-full'
                />
                <h4 className="text-white font-medium mb-1">{review.name}</h4>
              </div>
              <span className="text-sm text-gray-400">
                {/* {new Date(review.date).toLocaleDateString()} */}
                {extractNameFromEmail(review.email as string)}
              </span>
            </div>
            <p className="text-gray-300">
              {review.review}
            </p>
          </Card>
        ))
      ) : (
        <div className='text-gray-400 text-xl my-24 text-center'>
          No Reviews Yet!
        </div>
      )}
    </div>
  )
}

export default ReviewList
