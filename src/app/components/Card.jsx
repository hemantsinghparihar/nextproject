'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import profile from '../../../public/profileImg.png';
import cardImage from '../../../public/cardImage.png';
import Link from 'next/link';

const Card = ({ pitch }) => {
console.log('✌️pitch --->', pitch);

console.log('✌️pitch.title --->', pitch.description);
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className='border-4 rounded-lg px-2 py-2 border-black max-w-[320px]'>
      <div className="view-date flex justify-between text-[17px] items-center">
        <div className="date startup-card_date">{date}</div>

        <div className="view">
          <i className="ri-eye-line"></i>212
        </div>
      </div>

      <div className="desc flex justify-between">
        <div className="name-desc font-[500] text-[16px]">
          <p>{pitch?.users?.name}</p>
          <h5 className='font-semibold'>EcoTrack</h5>
        </div>
        <div className="img-desc">
          <Link href={`/user/${pitch?.user_id}`}>
        
              <Image src={pitch?.users?.avatar_url} width={40} height={40} style={{borderRadius:'50%'}} alt='profile-img' />
          
          </Link>
        
        </div>
      </div>

      <p className='startup-card_desc'>
        {/* A mobile app that helps users track and reduce their carbon footprint and best insights... */}
        {pitch?.description || "A mobile app that helps users track and reduce their carbon footprint and best insights..."}
      </p>

      {/* <Image src={cardImage} alt='startup image' /> */}
      <div className="card-img  h-[150px] overflow-hidden flex justify-center items-center relative">
          <Image src={pitch?.link} fill={true}  alt='startup image' className='object-contain' />
      </div>
      

      <div className='flex justify-between items-center mt-2'>
        <p className='text-[15px]'>Senior Level</p>
        <Link href={`/pitch/${pitch.id}`} >
           <p className='px-2 py-1 text-white rounded-full bg-[#141413]'>Details</p>
        </Link>
        
      </div>
    </div>
  );
};

export default Card;





// 'use client'
// import React from 'react'
// import Image from 'next/image'
// import profile from '../../../public/profileImg.png'
// import cardImage from '../../../public/cardImage.png'


// const Card = ({pitch}) => {
// console.log('✌️pitch --->', pitch);
//   return (
//     <div className='border-4 rounded-lg px-2 py-2 border-black max-w-[320px]'>
//       <div className="view-date flex justify-between text-[17px] items-center">
//         <div className="date startup-card_date">
//             {new Date().toLocaleDateString()}
//         </div>

//         <div className="view">
//             <i className="ri-eye-line"></i>212
//         </div>
//       </div>

//       <div className="desc flex justify-between  ">
//         <div className="name-desc  font-[500] text-[16px]">
//             <p className=''>Steven Smith</p>

//             <h5>EcoTrack</h5>
//         </div>
//         <div className="img-desc ">
//             <Image src={profile} alt='profile-img'/>
//         </div>

//       </div>

//       <p className='startup-card_desc'>A mobile app that helps users track and reduce their carbo and best ins...</p>

//       <Image src={cardImage} alt='startup image'/>

//       <div className='flex justify-between items-center mt-2'>
//         <p className='text-[15px] '>
//             Senior Level
//         </p>
//         <p className='px-2 py-1 text-white rounded-full bg-[#141413]'>Details</p>
//       </div>
//     </div>
//   )
// }

// export default Card
