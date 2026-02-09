export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-core-black">
      <div className="text-center">
        <div className="inline-flex items-center gap-1 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 h-8 bg-gradient-to-t from-red-spark to-purple-dream rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
        <div className="text-text-muted text-sm">Loading...</div>
      </div>
    </div>
  );
}
