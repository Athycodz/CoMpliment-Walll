import { useState } from 'react';

export default function Send() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const characterLimit = 500;
  const remainingChars = characterLimit - message.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recipient || !message) return;

    setIsSending(true);

    // Simulate API call - replace with actual backend call later
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setRecipient('');
      setMessage('');

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const suggestions = [
    "Your positive energy is contagious! ✨",
    "You make everyone around you feel valued and heard.",
    "Your creativity inspires others to think differently.",
    "You have an incredible ability to brighten someone's day.",
    "Your kindness doesn't go unnoticed.",
    "You're doing an amazing job, keep it up! 💪"
  ];

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Send a <span className="text-accent">Compliment</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Brighten someone's day with kind words, anonymously
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-accent/10 border border-accent/30 rounded-2xl p-4 text-center" style={{animation: 'fadeIn 0.5s ease-out'}}>
            <p className="text-accent font-semibold flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              Compliment sent successfully!
              <span className="text-2xl">✨</span>
            </p>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Input */}
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-accent/20 transition-all duration-300">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              To (Username or Link)
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="@username or profile link"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all duration-300"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-300">
                Your Compliment
              </label>
              <span className={`text-sm ${remainingChars < 50 ? 'text-accent' : 'text-gray-500'}`}>
                {remainingChars} characters left
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, characterLimit))}
              placeholder="Write something kind and thoughtful..."
              rows="6"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all duration-300 resize-none"
              required
            />
          </div>

          {/* Suggestions */}
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">
              💡 Need inspiration? Try these:
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-gray-800/50 hover:bg-accent/10 hover:border-accent/30 border border-gray-700 text-gray-300 hover:text-accent text-sm px-4 py-2 rounded-full transition-all duration-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Anonymous Badge */}
          <div className="bg-gradient-to-r from-accent/5 to-transparent border border-accent/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-xl">
              🎭
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200">Completely Anonymous</p>
              <p className="text-xs text-gray-400">Your identity will never be revealed</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending || !recipient || !message}
            className="w-full bg-accent hover:bg-accent/90 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {isSending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⭐</span>
                Sending...
              </span>
            ) : (
              'Send Compliment ✨'
            )}
          </button>
        </form>

        {/* Info Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Spread positivity. Make someone's day. Be kind. 💚
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}