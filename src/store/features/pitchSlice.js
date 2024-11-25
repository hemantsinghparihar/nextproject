'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pitches: [],
  searchQuery: '',
  searchResults:[],
  isLoading: false,
  error: null,
};

const pitchSlice = createSlice({
  name: 'pitch',
  initialState,
  reducers: {
    setPitches:(state,action)=> {
      state.pitches = action.payload;
    },
    setLoading:(state,action)=>{
      state.isLoading = action.payload;
    },
    setError:(state,action)=>{
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResultes:(state,action)=>{
      state.searchResults=action.payload;
    }

  },
});

export const { setPitches, setLoading, setError, setSearchResultes,setSearchQuery } = pitchSlice.actions;
export default pitchSlice.reducer;
