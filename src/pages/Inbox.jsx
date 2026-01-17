import { useState } from 'react';

export default function Inbox() {
  // Mock data - replace with API call later
  const [messages] = useState([
    {
      id: 1,
      text: "Your positive energy is contagious! Keep shining bright! ✨",
      timestamp: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      text: "You have an amazing ability to make everyone feel comfortable and welcome.",
      timestamp: "5 hours ago",
      isRead: true
    },
    {
      id: 3,
      text: "Your creativity and innovative thinking inspire everyone around you!",
      timestamp: "1 day ago",
      isRead: true
    },
    {
      id: 4,
      text: "You're doing an incredible job! Your hard work doesn't go unnoticed.",
      timestamp: "2 days ago",
      isRead: true
    },
    {
      id: 5,
      text: "Your smile literally brightens up the room. Never stop being you! 😊",
      timestamp: "3 days ago",
      isRead: true
    }
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'unread'

  const filteredMessages = filter === 'unread' 
    ? messages.filter(msg => !msg.isRead)
    : messages;

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Your <span className="text-accent">Compliments</span>
          </h1>
          <p className="text-gray-400">
            {messages.length} anonymous messages from people who appreciate you
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-accent text-black'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'unread'
                ? 'bg-accent text-black'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
            }`}
          >
            Unread ({messages.filter(m => !m.isRead).length})
          </button>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">💌</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-gray-400">
              Share your profile link to start receiving compliments!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message, index) => (
              <div
                key={message.id}
                className="group bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Anonymous Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center">
                        <span className="text-sm">🎭</span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">Anonymous</span>
                      {!message.isRead && (
                        <span className="bg-accent text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Message Text */}
                    <p className="text-gray-200 text-lg leading-relaxed mb-3">
                      {message.text}
                    </p>

                    {/* Timestamp */}
                    <p className="text-sm text-gray-500">{message.timestamp}</p>
                  </div>

                  {/* Heart Icon */}
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl hover:scale-110 transform transition-transform">
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {messages.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-accent/5 to-transparent border border-accent/10 rounded-2xl">
            <p className="text-gray-400 text-center">
              You've received <span className="text-accent font-bold">{messages.length}</span> compliments! 
              Keep spreading positivity! ✨
            </p>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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