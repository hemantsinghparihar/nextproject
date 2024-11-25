'use client';

import { configureStore } from '@reduxjs/toolkit';
import pitchReducer from './features/pitchSlice';

export const store = configureStore({
  reducer: {
    pitch: pitchReducer,
  },
});
