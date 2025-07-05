export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-textPrimary">
      <div className="text-center animate-pulse">
        <p className="text-xl font-semibold mb-2">Loading...</p>
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
