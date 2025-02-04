"use client";

import Login from "./components/login";
import { usePublic_pages } from "./hooks/usePublic_pages";

export default function Home() {
  const {IsNotSignedin}=usePublic_pages();
  IsNotSignedin();
  return (
    <div
      style={{
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:
          "url('tree.jpg')",
      }}
      className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Login />

      </main>

    </div>
  );
}
