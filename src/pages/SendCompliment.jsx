export default function SendCompliment() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Send a <span className="text-accent">Compliment</span>
        </h1>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Recipient's Enrollment Number"
            className="w-full bg-dark-card border border-gray-700 rounded-xl px-4 py-3"
          />
          <textarea
            rows={5}
            placeholder="Your compliment..."
            className="w-full bg-dark-card border border-gray-700 rounded-xl px-4 py-3"
          />
          <button className="w-full bg-accent text-dark py-4 rounded-full font-semibold">
            Send Anonymously
          </button>
        </form>
      </div>
    </div>
  );
}