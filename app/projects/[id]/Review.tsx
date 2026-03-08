"use client"

import { addReview } from '@/actions/addReview'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import React, { FormEvent, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

const Review = ({ projectId }: { projectId: string | null }) => {

  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState("")
  const { data: session } = useSession()
  const { toast } = useToast()

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!review || !projectId) {
      toast({
        title: "Review is Required !",
        description: "Kindly fill the form.",
        variant: "destructive"
      })
      setLoading(false)
      return
    }
    if (!session || !session.user?.email?.includes("@nith.ac.in")) {
      toast({
        title: "Un-Authorized !",
        description: "Please login with nith email to give reviews",
        variant: "destructive"
      })
      setLoading(false)
      return
    }
    try {
      const result = await addReview(review, projectId as string)
      setReview("")
      if (result.success) {
        setReview("")
        toast({
          title: "Success !",
          description: "Review is submitted Successfully"
        })
      } else {
        toast({
          title: "Error !",
          description: "Unexpected error occured.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.log("Review submission error: ", error)
      toast({
        title: "Error !",
        description: "Unexpected error occured."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='space-y-6 my-12'>
      <Input
        className='bg-gray-500/20 py-6 text-xl placeholder:text-gray-400 border-2 border-gray-700 focus:border-gray-400 text-white'
        placeholder='Give a Review'
        type='text'
        onChange={(e) => setReview(e.target.value)}
      />
      <Button
        type='submit'
        disabled={loading}
        className='w-full bg-gradient-to-tr from-indigo-500 via-indigo-800 to-indigo-500 text-xl py-6 flex gap-2 justify-center items-center'
      >
        {loading && <Loader2 className='h-5 w-5 animate-spin' />}
        SUBMIT
      </Button>
    </form>
  )
}

export default Review
