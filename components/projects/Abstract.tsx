import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer'

const Abstract = ({ abstract }: { abstract: string }) => {
  return (
    <DrawerContent className='bg-gradient-to-tr from-blue-500/20 via-indigo-600/40 to-purple-600/20'>
      <DrawerHeader>
        <DrawerTitle className='text-2xl md:text-3xl font-bold bg-gradient-to-b from-indigo-200 to-indigo-500 bg-clip-text text-transparent'>Abstract</DrawerTitle>
        <DrawerDescription className='text-gray-300 text-lg md:text-xl md:mt-6'>
          <ScrollArea className='h-96 px-4 w-full rounded-2xl'>
            {abstract}
          </ScrollArea>
        </DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  )
}

export default Abstract
