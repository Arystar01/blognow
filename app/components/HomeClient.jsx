'use client';
export default function HomeClient({ user }) {
  return (
    <div>
      <h1>Welcome, {user?.username || 'Guest'}!</h1>
    </div>
  );
}
