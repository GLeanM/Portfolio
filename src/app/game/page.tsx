import PongGame from "@/components/game/PongGame";

export default function GamePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-semibold">Pong</h1>
      <PongGame />
    </main>
  );
}
