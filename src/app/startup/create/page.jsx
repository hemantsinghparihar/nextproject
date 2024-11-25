import CreatePitchForm from '@/app/components/CreatePitchForm'
import React from 'react'
import { auth } from '../../../../auth'

const createFormPage =async () => {
  const session = await auth();
  return (
    <div>
        <section className='pink_container min-h-[230px]' >
            <h1 className="heading">
                Submit Your Startup Pitch
            </h1>
        </section>

      
            <CreatePitchForm session={session}/>
        
    </div>
  )
}

export default createFormPage
