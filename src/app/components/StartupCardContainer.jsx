'use client'
import React from 'react'
import Card from './Card'
import Link from 'next/link'

const StartupCardContainer = (props) => {
  const pitches=props.pitches
  return (
    <div>
        <h1 className='font-bold my-2 py-2 px-2'>Recomended Startup</h1>
        <div className="card-container  ">
         
            {pitches.map((pitch, index) => (
              
                  <Card key={index} pitch={pitch}  />
            
            ))}
          
        </div>
      
    </div>
  )
}

export default StartupCardContainer
