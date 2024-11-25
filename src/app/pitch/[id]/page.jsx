'use client'

import React,{useEffect} from 'react'
import Image from 'next/image'
import detailImg from '../../../../public/detailImg.png'
import Card from '@/app/components/Card'
import { useSelector,useDispatch } from 'react-redux'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import pitchServices from '@/services/fetchPitches'
import { setPitches } from '@/store/features/pitchSlice'



const pitchPage = () => {
    const dispatch=useDispatch();
    const session=useSession()
    const params =useParams();
    const {id}=params;
console.log('✌️id --->', id);

    const pitches=useSelector((state)=>state.pitch.pitches)
    console.log('✌️pitches --->', pitches);

    const pitch=pitches.find((one)=>(

        String(one.id) === String(id)
    ))
    console.log('✌️pitch --->', pitch);

    useEffect(() => {
        pitchServices
          .fetchPitches()
          .then((res) => {
            dispatch(setPitches(res.data));
          })
          .catch((err) => {
            console.error('Error fetching pitches:', err);
            dispatch(setError('Failed to fetch pitches'));
          });
      }, [dispatch]);

  return (
    <div>
      <section className="pink_container">
        <div className="hero-section max-w-[1240px]  border-black">
          <div className="yello-container my-4 mx-auto  bg-yellow-300 max-w-[271px] rounded-md">
            <p className="font-worksans font-bold py-2 px-2 mx-auto text-center text-[17px] uppercase ">October 5 2024</p>
          </div>
          <h1 className="heading">
          {pitch?.title}
          </h1>

        <p className="leading-[30px] font-[500] text-white text-center text-[20px] mb-2">
             {pitch?.description}       
         </p>


        </div>
      </section>

      <div className="details-container  max-w-[1150px] mx-auto">
        <div className="image-container mx-auto flex justify-center">
            <Image src={detailImg} width={1110} height={583} alt='details ' />
        </div>

        <div className="pitch-details max-w-[800px]  min-h-[100px] mx-auto">
            
            <div className="user-details flex my-4 ">
                <div className="avatar overflow-hidden rounded-full w-[30px] h-[30px]">
                    {pitch && (
                        <Image src={pitch?.users?.avatar_url} width={30} height={30} alt='avatar'/>
                    )}
                    

                </div>
                <div className='flex justify-between  w-[100%] '>
                    <Link href={`/user/${pitch?.user_id}`}>
                    <div>
                        <h2 className='font-bold '>
                            {/* Hemant singh parihar */}
                            {pitch?.users?.name}
                        </h2>
                        <span>
                            {/* hemantsinghparihar13@gmail.com */}
                            {pitch?.users?.email}
                        </span>

                    </div>
                    </Link>
                 
                    <div className="date startup-card_date">
                        {pitch?.category}
                    </div>   
                   

                </div>
            </div>

            <div className="pitch-details border-2-bottom py-4 ">
                <h3 className='font-bold my-2 '>
                    Pitch details
                </h3>
                <div className='leading-6 my-2'>
                {/* Explanation
                    protocol: Specifies the protocol (https in this case).
                    hostname: The domain hosting the images, here avatars.githubusercontent.com.
                    port: Optional; leave it empty if the images are served on the default ports (80 for HTTP and 443 for HTTPS).
                    pathname: Specifies the path pattern. Using /** allows all paths under this hostname. */}
                    {pitch?.pitch}
                </div>
            </div>

            <div className="similer-startup mt-6">
                <h2 className='font-bold'>
                    SImiler Startup
                </h2>

                <div className="card-container">
                    {pitches?.map((one,index)=>(
                        <Link href={`/pitch/${one.id}`} key={index}>
                            <Card pitch={one}/> 
                        </Link>
                        
                    ))}
                    
                </div>
            </div>


        </div>

        

      </div>
    </div>
  )
}

export default pitchPage
