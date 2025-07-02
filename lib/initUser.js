// lib/initUser.js
import { currentUser } from '@clerk/nextjs/server';
import { connectDB } from './db';
import User from '@/models/UserModel';

export async function initUserInDB() {
  await connectDB();

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const existingUser = await User.findOne({ clerkID: clerkUser.id });
  if (existingUser) return existingUser;

  const newUserDoc = await User.create({
    clerkID: clerkUser.id,
    username: clerkUser.username || clerkUser.emailAddresses?.[0]?.emailAddress.split('@')[0],
    firstname: clerkUser.firstName || '',
    lastname: clerkUser.lastName || '',
    email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
    profilePicture: clerkUser.imageUrl || '',
  });
  const newUser = JSON.parse(JSON.stringify(newUserDoc)); // 👈 make it plain
  return newUser;
}
