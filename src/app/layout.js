'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import localFont from "next/font/local";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import { SessionProvider } from "next-auth/react";

const workSans = localFont({
  src: [
    // {
    //   path: './fonts/WorkSans-black.ttf', // Corrected from 'pathh' to 'path'
    //   weight: '900',
    //   style: 'black',
    // },
    {
      path: './fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/WorkSans-Light.ttf',
      weight: '300',
      style: 'light',
    },
    {
      path:'./fonts/WorkSans-ExtraBold.ttf',
      weight: '800',
      style: 'extrabold',  
    },
    {
      path:'./fonts/WorkSans-SemiBold.ttf',
      weight: '700',
      style: 'semibold',  
    },
    {
      path:'./fonts/WorkSans-ExtraLight.ttf',
      weight: '200',
      style: 'extralight',  
    }
  ],
  variable: '--font-worksans',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className={workSans.variable}>
      <SessionProvider>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
      </body>
    </html>
  );
}
