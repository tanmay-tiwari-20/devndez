import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      {/* Empty section to allow scrolling to test the sticky/floating navbar effect */}
      <section className="h-[200vh] w-full pt-48 px-6 flex flex-col items-center">
        <h1 className="text-2xl font-medium text-gray-400">
          Scroll down to test the Navbar
        </h1>
      </section>
    </main>
  );
}
