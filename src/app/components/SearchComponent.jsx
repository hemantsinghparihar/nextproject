'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResultes, setSearchQuery } from '@/store/features/pitchSlice';

// Debounce Hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchComponent = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.pitch.searchQuery);
  const debouncedQuery = useDebounce(searchQuery, 800);

  useEffect(() => {
    if (!debouncedQuery) {
      // Clear search results when search query is empty
      dispatch(setSearchResultes([]));
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const result = await response.json();

        if (response.ok) {
          dispatch(setSearchResultes(result.results || []));
        } else {
          console.error('Error fetching search results:', result.message);
        }
      } catch (err) {
        console.error('Error fetching search results:', err.message);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery, dispatch]);

  const handleSearchQueryChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <form className="search-form mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="flex w-full">
        <input
          name="query"
          className="search-input"
          placeholder="Search Startup"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <div className="search-btn">
          <button type="submit">
            <i className="ri-search-line text-white text-[30px]"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchComponent;









// 'use client';
// import React, { useState } from 'react';

// const SearchComponent = () => {
//   const [query, setQuery] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Search Query:', query);
//     // Add logic to handle the search query
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-form mx-auto">
//       <div className=" flex w-full">
//         <input
//           name="query"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-input "
//           placeholder="Search Startup"
//         />
//         <div className="search-btn">
//           <button type="submit">
//             <i className="ri-search-line text-white text-[30px]"></i>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SearchComponent;




// import React from 'react';
// import Form from 'next/form';

// const SearchComponent = ({query}) => {
// console.log('✌️query --->', query);
//   return (
//     <Form action="/" method="POST" className="search-form mx-auto">
//       <div className="border-2 flex w-full">
//         <input
//           name="query"
//           defaultValue={query}
//           className="search-input border-2"
//           placeholder="Search Startup"
//         />
//         <div className="search-btn">
//           <button type="submit">
//             <i className="ri-search-line text-white text-[30px]"></i>
//           </button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default SearchComponent;









// import React from 'react'
// import Form from "next/form"


// const SearchComponent = () => {

//     const query='Test'

   
//   return (
//     <Form action='/' scroll={false } className="search-form mx-auto ">
//           <div className="border-2 flex w-full" >
//             <input name='query' defaultValue={""}  className="search-input border-2" placeholder="Search Startup" />

//             {query && (
//                 <div className="search-btn">
//                     <button type='submit' >
//                     <i class="ri-search-line text-white text-[30px]"></i>
//                     </button>
//                 </div>
//             )}
            
//           </div>
          

//     </Form>
//   )
// }

// export default SearchComponent
