import React from 'react'
import ForgotForm from '@/components/forms/forgot-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
function ForgotPassword() {
  return (
    <div className="">
      <Link href={"/"} className='absolute top-4 left-4'>
        <Button >
          <HomeIcon className='text-gray-700'/>
          Inicio
        </Button>
      </Link>
      <div className='flex items-center justify-center h-screen'>

        <ForgotForm />
      </div>
    </div>

  )
}

export default ForgotPassword