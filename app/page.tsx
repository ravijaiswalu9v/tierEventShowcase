"use client"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main
      className="bg-black/70 bg-[url('/images/desktop-hero-ltr.png')] bg-cover bg-no-repeat bg-right
      h-[calc(100vh-80px)] bg-blend-overlay flex flex-col justify-center items-center
      px-4 py-6 sm:px-8 sm:py-10 md:px-12 lg:px-20 text-white text-center"
    >
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
          Curated AI Events. Personalized for You.
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-[90%] sm:max-w-[70%] mx-auto">
          Discover exclusive tech and AI events tailored to your interests. From
          free community talks to platinum-tier masterclasses, Psypher.AI
          connects you with the future of innovation.
        </p>
        {/* if the user is not logged out */}
        <SignedOut>
          <SignInButton mode="redirect">
            <button
              type="button"
              className="mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
            rounded-lg text-sm sm:text-base px-6 py-3"
            >
              Get Started
            </button>
          </SignInButton>
        </SignedOut>

        {/* if the user is logged in */}
        <SignedIn>
            <button
              type="button"
              onClick={()=>router.push("/events")}
              className="mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
            rounded-lg text-sm sm:text-base px-6 py-3"
            >
              View Events
            </button>
        </SignedIn>
      </div>
    </main>
  );
}
