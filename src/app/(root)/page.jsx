'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPitches, setError } from '@/store/features/pitchSlice';
import pitchServices from '@/services/fetchPitches';
import SearchComponent from '../components/SearchComponent';
import StartupCardContainer from '../components/StartupCardContainer';

export default function Home() {
  const dispatch = useDispatch();
  
  // Redux state
  const pitches = useSelector((state) => state.pitch.pitches);
  const searchResults = useSelector((state) => state.pitch.searchResults);

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
    <>
      <section className="pink_container">
        <div className="hero-section max-w-[1240px] border-black">
          <div className="yello-container my-4 mx-auto bg-yellow-300 max-w-[271px] rounded-md">
            <p className="font-worksans font-bold py-2 px-2 mx-auto text-center text-[17px] uppercase">
              Pitch, Vote, and Grow
            </p>
          </div>
          <h1 className="heading">Pitch Your Startup, Connect with Entrepreneurs</h1>
          <p className="leading-[30px] font-[500] text-white text-center text-[20px] mb-2">
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
          </p>
          {/* Search Component */}
          <SearchComponent />
        </div>
      </section>

      {/* Display Search Results or Default Pitches */}
      <StartupCardContainer pitches={searchResults.length > 0 ? searchResults : pitches} />
    </>
  );
}






// 'use client'
// import Image from "next/image";
// import SearchComponent from "../components/SearchComponent";
// import StartupCardContainer from "../components/StartupCardContainer";
// import { supabase } from "@/lib/supabaseClient";
// import React,{useEffect} from "react";
// import pitchServices from "@/services/fetchPitches";
// import { useSelector,useDispatch } from "react-redux";
// import { setPitches, setLoading, setError  } from "@/store/features/pitchSlice";


// export default  function Home() {
//   const dispatch=useDispatch();
//   const pitches=useSelector((state)=>state.pitch.pitches)
// console.log('✌️pitches --->', pitches);
// const searchResults=useSelector((state)=>state.pitch.searchResults)

//   useEffect(()=>{
//     pitchServices.fetchPitches().then((res)=>{
//       console.log('✌️res --->', res);
//       dispatch(setPitches(res.data))
      
//     })
//   },[])

//   //fetch pitches data from supabasesupabase

  
//     // const { data: pitches, error } = await supabase
//     //   .from('pitches')
//     //   .select(`
//     //     id,
//     //     title,
//     //     description,
//     //     category,
//     //     user_id,
//     //     users (
//     //       name,
//     //       avatar_url
//     //     )
//     //   `);

//     // if (error) {
//     //   console.error('Error fetching pitches:', error)
//     // }
//     // console.log('Fetched pitches:', pitches);


  
 
//   return (
//     <>
//       <section className="pink_container">
//         <div className="hero-section max-w-[1240px]  border-black">
//           <div className="yello-container my-4 mx-auto  bg-yellow-300 max-w-[271px] rounded-md">
//             <p className="font-worksans font-bold py-2 px-2 mx-auto text-center text-[17px] uppercase ">Pitch, Vote, and Grow</p>
//           </div>
//           <h1 className="heading">
//           Pitch Your Startup, 
//           Connect with Entrepreneurs
//           </h1>

//         <p className="leading-[30px] font-[500] text-white text-center text-[20px] mb-2">
//           Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
//         </p>

//         <SearchComponent />

//         </div>
//       </section>

//       {     
      
//         !searchResults ? (
//           <StartupCardContainer pitches={pitches} />
//         ) : (
//           // Add content here to render when searchResults is truthy
//           <StartupCardContainer pitches={searchResults}/>
//         )
            
          
          
       
//       }

      
      
//     </>
//   );
// }
