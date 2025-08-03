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

      const filtered = data.filter(
        (event) => tierRank[event.tier] <= tierRank[userTier]
      );

      setLoading(false)
      setEvents(filtered);
    };

    fetchEvents();
  }, [userTier]);

   if (loading) { return <Spinner/>;}

  return (
     <div className="lg:py-24 lg:px-32 p-10 bg-gradient-to-r from-indigo-500 to-purple-500">
      <h1 className="text-3xl font-bold mb-6">Your Events ({userTier})</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EventsPage() {
  return (
    <>
      <SignedOut>
        <div className="h-[calc(100vh-64px)] lg:py-24 lg:px-32 p-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-center ">
          <p className="mb-4 text-lg font-medium">Please sign in to view events.</p>
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
