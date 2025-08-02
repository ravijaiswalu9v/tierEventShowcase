"use client";
import { useUser } from "@clerk/nextjs";

const EventsPage = () => {
  const { user } = useUser();
  const tier = user?.publicMetadata?.tier || "free";
  return (
    <>
      <div className="min-h-screen flex-col flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-red-300 text-3xl font-bold">
        <h1>event page</h1>
        <h2>Your Tier: {tier}</h2>
      </div>
    </>
  );
};

export default EventsPage;
