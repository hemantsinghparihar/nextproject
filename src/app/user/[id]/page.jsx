'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@/app/components/Card';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ProfilePage = () => {
  const dispatch = useDispatch();
  
  const { id: clickedUserId } = useParams();
  console.log('✌️clickedUserId --->', clickedUserId);

  const [userPitch, setUserPitch] = useState([]);

  const pitches = useSelector((state) => state.pitch.pitches);
  console.log('✌️pitches data --->', pitches);

  const session = useSession();
  console.log('✌️session --->', session);
  const user = session?.data?.user;
  console.log('✌️user --->', user);

  const email = user?.email;

  // Filter pitches by user email when `pitches` or `email` changes
  // useEffect(() => {
  //   if (pitches && email) {
  //     const filtering = pitches.filter((one) => one?.users?.email === email);
  //     setUserPitch(filtering);
  //     console.log('✌️filtering user cards --->', filtering);
  //   }
  // }, [pitches, email]);

  useEffect(() => {
    if (pitches && email) {
      const filtering = pitches.filter((one) => String(one?.user_id )=== String(clickedUserId));
      setUserPitch(filtering);
      console.log('✌️filtering user cards --->', filtering);
    }
  }, [pitches, email]);
  return (
    <div>
      <div className="profile-container m-6 p-4 w-[90%] flex">
        {/* Sidebar */}
        <div className="sidebar w-[30%] h-full">
          <div className="profile-card border-4 border-black w-[312px] h-[431px] rounded-xl relative bg-[#EE2B69]">
            {/* Profile Name */}
            <div className="profile-name min-w-[280px] left-[16px] top-[-22px] absolute border-4 border-black z-10 bg-white rounded-lg py-1">
              <h1 className="text-center font-extrabold text-[24px]">
                {userPitch[0]?.users?.name}
              </h1>
            </div>

            {/* Profile Image */}
            {
              userPitch &&(
                <div className="profile-img-container w-full flex justify-center items-center mt-[60px]">
              <div className="profile-image rounded-full w-[230px] h-[230px] overflow-hidden flex justify-center items-center bg-white">
                <Image
                  src={userPitch[0]?.users?.avatar_url}
                  alt="user_avatar"
                  width={210}
                  height={210}
                  style={{ objectFit: 'contain', borderRadius: '50%' }}
                />
              </div>
            </div>
              )
            }

            <h1 className="text-white mt-3 font-bold text-[30px]">@nathansmith</h1>
            <h4 className="text-white">Next.js Enthusiast & Educator</h4>
          </div>
        </div>

        {/* User Pitches */}
        <div className="user-pitches w-[70%] h-full overflow-auto overflow-x-hidden">
          <div className="profile-card">
            <div className="card-container">
              {userPitch.length > 0 ? (
                userPitch.map((one, index) => (
                  
                    <Card pitch={one} key={index}/>
                
                ))
              ) : (
                <p>No pitches found for this user.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;




// 'use client'
// import React,{useState,useEffect} from 'react'
// import Image from 'next/image'
// import { useSession } from 'next-auth/react'
// import { useSelector,useDispatch } from 'react-redux'
// import { setPitches } from '@/store/features/pitchSlice'
// import Card from '@/app/components/Card'
// import Link from 'next/link'


// const profilePage = () => {
//   const dispatch=useDispatch();
//   const [userPitch,setUserPitch]=useState([])

//   const pitches=useSelector((state)=>state.pitch.pitches)
// console.log('✌️pitches data --->', pitches);

//   const session=useSession()
// console.log('✌️session --->', session);
//   const user=session?.data?.user
// console.log('✌️user --->', user);

//   const email=session?.data?.user?.email


//   const filtering=pitches.filter((one)=>(
//     one.users.email===email
   
//   ))
//   console.log('✌️filtering user cards --->', filtering);
//   setUserPitch(filtering)


  
//   return (
//     <div>
//       <div className="profile-container  m-6 p-4 w-[90%] flex">
//         <div className="sidebar  w-[30%] h-full  ">
//             <div className="profile-card border-4 border-black w-[312px] h-[431px] rounded-xl relative bg-[#EE2B69]">

//                 <div className="profile-name min-w-[280px] left-[16px] top-[-22px] absolute border-4 border-black z-10 bg-white rounded-lg py-1">
//                     <h1 className='min-width-[280px] text-center font-extrabold text-[24px] '>{session?.data?.user?.name} </h1>
//                 </div>

//                 <div className="profile-img-container  w-full  flex justify-center items-center mt-[60px]">
//                     <div className="profile-image  rounded-full w-[230px] h-[230px] overflow-hidden flex justify-center items-center bg-[white]">
//                       <Image src={session?.data?.user?.image}  alt='user_avatar' width={210} height={210}  style={{ objectFit: 'contain', borderRadius:'50%' }} />

//                     </div>
//                 </div>

//                 <h1 className='text-white mt-3 font-bold text-[30px]'>@nathansmith</h1>
//                 <h4 className='text-white'>Next.js Enthusiast & Educator</h4>



//             </div>

//         </div>
//         <div className="user-pitches w-[70%] h-full overflow-auto overflow-x-hidden ">
//             <div className="profile-card ">
//                 <div className="card-container">
//                   {
//                     userPitch && (
//                       userPitch.map((one,index)=>(
//                         <Link href={`/pitch/${index}`}>
//                           <Card pitch={one}/> 
//                         </Link>
                        
//                       ))
                         
//                     )
//                   }
                    
//                 </div>
                
//             </div>        

//         </div>

//       </div>
//     </div>
//   )
// }

// export default profilePage
