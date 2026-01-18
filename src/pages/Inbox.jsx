import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function Inbox() {
  const navigate = useNavigate();
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  useEffect(() => {
    checkAuthAndFetchCompliments();
  }, []);

  const checkAuthAndFetchCompliments = async () => {
    // Check if user is logged in
    if (!auth.currentUser) {
      console.log('❌ No user logged in, redirecting to login...');
      navigate('/login');
      return;
    }

    try {
      console.log('✅ Fetching compliments for:', auth.currentUser.email);
      
      // Query compliments where toUserId matches current user
      const complimentsRef = collection(db, 'compliments');
      const q = query(complimentsRef, where('toUserId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const complimentsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        complimentsData.push({
          id: doc.id,
          ...data,
          // Calculate time ago
          timeAgo: calculateTimeAgo(data.timestamp)
        });
      });

      // Sort by newest first
      complimentsData.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      setCompliments(complimentsData);
      console.log('✅ Loaded compliments:', complimentsData.length);
    } catch (error) {
      console.error('❌ Error fetching compliments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeAgo = (timestamp) => {
    if (!timestamp) return 'recently';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return time.toLocaleDateString();
  };

  const markAsRead = async (complimentId) => {
    try {
      await updateDoc(doc(db, 'compliments', complimentId), {
        isRead: true
      });
      
      // Update local state
      setCompliments(compliments.map(c => 
        c.id === complimentId ? { ...c, isRead: true } : c
      ));
      
      console.log('✅ Marked compliment as read:', complimentId);
    } catch (error) {
      console.error('❌ Error marking as read:', error);
    }
  };

  const filteredCompliments = filter === 'unread' 
    ? compliments.filter(c => !c.isRead)
    : compliments;

  const unreadCount = compliments.filter(c => !c.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Your <span className="text-accent">Compliments</span>
          </h1>
          <p className="text-gray-400">
            {compliments.length} anonymous message{compliments.length !== 1 ? 's' : ''} from people who appreciate you
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-accent text-black'
                : 'bg-gray-900/40 text-gray-400 hover:bg-gray-900/60'
            }`}
          >
            All ({compliments.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'unread'
                ? 'bg-accent text-black'
                : 'bg-gray-900/40 text-gray-400 hover:bg-gray-900/60'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Compliments List */}
        {filteredCompliments.length === 0 ? (
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {filter === 'unread' ? 'No unread compliments' : 'No compliments yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'unread' 
                ? 'You\'ve read all your compliments!'
                : 'Be the first to spread kindness - send compliments to others!'}
            </p>
            <button
              onClick={() => navigate('/send')}
              className="bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Send a Compliment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCompliments.map((compliment, index) => (
              <div
                key={compliment.id}
                className={`group bg-gray-900/40 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 ${
                  compliment.isRead ? 'border-gray-800/50' : 'border-accent/40'
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-accent">Anonymous</span>
                      {!compliment.isRead && (
                        <span className="bg-accent text-black text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      <span className="text-sm text-gray-500 ml-auto">
                        {compliment.timeAgo}
                      </span>
                    </div>

                    <p className="text-gray-200 text-lg leading-relaxed mb-4">
                      {compliment.message}
                    </p>

                    {!compliment.isRead && (
                      <button
                        onClick={() => markAsRead(compliment.id)}
                        className="text-sm text-accent hover:text-accent/80 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Encouragement Box */}
        {compliments.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6 text-center">
            <p className="text-gray-300">
              💝 You've received {compliments.length} compliment{compliments.length !== 1 ? 's' : ''}! 
              Why not spread the love?
            </p>
            <button
              onClick={() => navigate('/send')}
              className="mt-4 bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Send a Compliment
            </button>
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