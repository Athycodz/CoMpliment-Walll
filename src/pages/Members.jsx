import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Members() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members from Firestore on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        usersData.push({
          id: doc.id,
          username: data.username,
          email: data.email,
          complimentsReceived: data.complimentsReceived || 0,
          joinedDate: calculateJoinedDate(data.createdAt),
          color: generateColor(doc.id) // Generate consistent color based on user ID
        });
      });

      setMembers(usersData);
      console.log('✅ Fetched members:', usersData);
    } catch (error) {
      console.error('❌ Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate how long ago user joined
  const calculateJoinedDate = (createdAt) => {
    if (!createdAt) return 'recently';
    
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Generate consistent color for each user
  const generateColor = (id) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Filter members by search query
  const filteredMembers = members.filter(member =>
    member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
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

        {/* Loading State */}
        {loading ? (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-gray-400">Loading members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center">
            <p className="text-gray-400">
              {searchQuery ? `No members found matching "${searchQuery}"` : 'No members yet'}
            </p>
          </div>
        ) : (
          <>
            {/* Members Grid */}
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
                        {member.username}
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
                    to={`/send?to=${member.username}`}
                    className="block w-full bg-accent/10 hover:bg-accent text-gray-300 hover:text-black font-semibold py-3 rounded-xl text-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20"
                  >
                    Send Compliment ✨
                  </Link>
                </div>
              ))}
            </div>

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
                  {members.length > 0 ? Math.round(members.reduce((sum, m) => sum + m.complimentsReceived, 0) / members.length) : 0}
                </p>
                <p className="text-gray-400">Avg per Member</p>
              </div>
            </div>
          </>
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