type GameOverPanelProps = {
  score: number;
  onRetry: () => void;
};

export default function GameOverPanel({ score, onRetry }: GameOverPanelProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <p className="text-lg font-semibold">Game Over</p>
      <p className="text-sm">Final score: {score}</p>
      <button
        onClick={onRetry}
        className="rounded bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-gray-200"
      >
        Retry
      </button>
    </div>
  );
}
