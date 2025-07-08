
// app/page.jsx

import React from 'react';
import { initUserInDB } from '@/lib/initUser';
import HomeClient from './components/HomeClient';

export default async function Home() {
  const user = await initUserInDB();
  
   // Ensures DB user exists
  return <HomeClient user={user} />;
}
