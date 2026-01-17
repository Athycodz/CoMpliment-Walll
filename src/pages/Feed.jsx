export default function Feed() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Public <span className="text-accent">Feed</span>
        </h1>
        <div className="bg-dark-card border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400">No posts yet!</p>
        </div>
      </div>
    </div>
  );
}