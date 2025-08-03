"use client";

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import Spinner from '@/components/spinner/page';

type Event = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  tier: 'free' | 'silver' | 'gold' | 'platinum';
};

const tierRank: Record<string, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};


const EventList = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);

  const userTier = (user?.publicMetadata?.tier as string) || 'free';
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        setLoading(false);
        console.error('Error fetching events:', error.message);
        return;
      }

      setLoading(false)
      setEvents(data);
    };

    fetchEvents();
  }, [userTier]);

   if (loading) { return <Spinner/>;}

  return (
     <div className="lg:py-20 lg:px-32 md:px-16 p-10 bg-gradient-to-r from-black/40 to-purple-600">
      <h1 className="text-3xl font-bold mb-6 ">Your Events 
        <span className={`inline-block text-sm font-bold uppercase px-5 py-3 ml-2 rounded-full ${
                userTier === 'platinum' ? 'bg-purple-600 text-white' :
                userTier === 'gold' ? 'bg-yellow-500 text-white' :
                userTier === 'silver' ? 'bg-gray-400 text-white' :
                'bg-green-500 text-white'
              }`}>{userTier}
        </span>
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) =>{
        const isLocked = tierRank[event.tier] > tierRank[userTier];
        
        return(
          <div
            key={event.id}
            className={`relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition transform duration-300
              ${isLocked ? 'opacity-70 grayscale pointer-events-none' : 'hover:scale-105 hover:shadow-lg'}`}>
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-700">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(event.event_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full ${
                event.tier === 'platinum' ? 'bg-purple-600 text-white' :
                event.tier === 'gold' ? 'bg-yellow-500 text-white' :
                event.tier === 'silver' ? 'bg-gray-400 text-white' :
                'bg-green-500 text-white'
              }`}>
                {event.tier}
              </span>
            </div>

            {isLocked && (
              <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center text-center px-4">
                <p className="text-sm sm:text-base font-semibold">
                  Upgrade to <span className="capitalize">{event.tier}</span> to access this event
                </p>
              </div>
            )}
          </div>
        )})}
      </div>
    </div>
  );
};

export default function EventsPage() {
  return (
    <>
      <SignedOut>
        <div className="h-[calc(100vh-64px)] lg:py-24 lg:px-32 p-10 bg-gradient-to-r from-black/40 to-purple-600 text-center ">
          <p className="mb-4 md:text-4xl text-2xl font-medium">Please sign in to view events.</p>
          <SignInButton>
            <button 
            className='bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer'>
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <EventList />
      </SignedIn>
    </>
  );
}
