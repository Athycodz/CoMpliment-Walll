import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Members() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - replace with API call later
  const [members] = useState([
    { id: 1, username: 'johndoe', name: 'John Doe', joinedDate: '2 days ago', complimentsReceived: 12, color: '#FF6B6B' },
    { id: 2, username: 'janesmit', name: 'Jane Smith', joinedDate: '1 week ago', complimentsReceived: 8, color: '#4ECDC4' },
    { id: 3, username: 'alexchen', name: 'Alex Chen', joinedDate: '3 days ago', complimentsReceived: 15, color: '#45B7D1' },
    { id: 4, username: 'sarahpark', name: 'Sarah Park', joinedDate: '5 days ago', complimentsReceived: 20, color: '#FFA07A' },
    { id: 5, username: 'mikejones', name: 'Mike Jones', joinedDate: '1 day ago', complimentsReceived: 5, color: '#98D8C8' },
    { id: 6, username: 'emilydavis', name: 'Emily Davis', joinedDate: '4 days ago', complimentsReceived: 18, color: '#F7DC6F' },
    { id: 7, username: 'davidlee', name: 'David Lee', joinedDate: '6 days ago', complimentsReceived: 10, color: '#BB8FCE' },
    { id: 8, username: 'lisawang', name: 'Lisa Wang', joinedDate: '2 weeks ago', complimentsReceived: 25, color: '#85C1E2' },
  ]);

  const filteredMembers = members.filter(member =>
    member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Our <span className="text-accent">Members</span>
          </h1>
          <p className="text-gray-400">
            {members.length} amazing people spreading positivity
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members by name or username..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center">
            <p className="text-gray-400">No members found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, index) => (
              <div
                key={member.id}
                className="group bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`
                    }}
                  >
                    {/* Animated person icon */}
                    <svg 
                      className="w-10 h-10" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      style={{
                        animation: 'float 3s ease-in-out infinite'
                      }}
                    >
                      {/* Head */}
                      <circle 
                        cx="12" 
                        cy="8" 
                        r="3" 
                        fill={member.color}
                        opacity="0.8"
                      />
                      {/* Body */}
                      <path 
                        d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" 
                        stroke={member.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </svg>
                    
                    {/* Floating particles */}
                    <div 
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: member.color,
                        top: '20%',
                        right: '20%',
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                      }}
                    ></div>
                    <div 
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: member.color,
                        bottom: '20%',
                        left: '20%',
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 1s'
                      }}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-accent">@{member.username}</p>
                    <p className="text-xs text-gray-500 mt-1">Joined {member.joinedDate}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-4 p-3 bg-black/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Compliments</span>
                    <span className="text-accent font-bold text-lg">{member.complimentsReceived}</span>
                  </div>
                </div>

                {/* Send Button */}
                <Link
                  to="/send"
                  className="block w-full bg-accent/10 hover:bg-accent text-gray-300 hover:text-black font-semibold py-3 rounded-xl text-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20"
                >
                  Send Compliment ✨
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-accent mb-2">{members.length}</p>
            <p className="text-gray-400">Total Members</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-accent mb-2">
              {members.reduce((sum, m) => sum + m.complimentsReceived, 0)}
            </p>
            <p className="text-gray-400">Compliments Sent</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-accent mb-2">
              {Math.round(members.reduce((sum, m) => sum + m.complimentsReceived, 0) / members.length)}
            </p>
            <p className="text-gray-400">Avg per Member</p>
          </div>
        </div>
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}