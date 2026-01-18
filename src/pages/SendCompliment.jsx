import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';

export default function SendCompliment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [recipientUsername, setRecipientUsername] = useState(searchParams.get('to') || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch all users for autocomplete
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when recipient input changes
  useEffect(() => {
    if (recipientUsername.trim()) {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(recipientUsername.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredUsers([]);
      setShowSuggestions(false);
    }
  }, [recipientUsername, users]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      const usersData = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (auth.currentUser && docSnap.id !== auth.currentUser.uid) {
          usersData.push({
            id: docSnap.id,
            username: data.username,
            email: data.email
          });
        }
      });
      
      setUsers(usersData);
      console.log('✅ Fetched users for autocomplete:', usersData.length);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Starting compliment submission...');
    console.log('Current user:', auth.currentUser?.email);
    
    if (!auth.currentUser) {
      setError('You must be logged in to send compliments');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('🔍 Step 1: Finding recipient...', recipientUsername);
      
      // 1. Find recipient by username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', recipientUsername.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('❌ User not found:', recipientUsername);
        setError(`User "${recipientUsername}" not found`);
        setLoading(false);
        return;
      }

      const recipientDoc = querySnapshot.docs[0];
      const recipientId = recipientDoc.id;
      const recipientData = recipientDoc.data();
      
      console.log('✅ Found recipient:', recipientData.username, 'ID:', recipientId);

      // 2. Check if trying to send to yourself
      if (recipientId === auth.currentUser.uid) {
        console.log('❌ Cannot send to self');
        setError("You can't send a compliment to yourself!");
        setLoading(false);
        return;
      }

      // 3. Basic validation
      if (message.trim().length < 10) {
        setError('Compliment must be at least 10 characters long');
        setLoading(false);
        return;
      }

      if (message.trim().length > 500) {
        setError('Compliment must be less than 500 characters');
        setLoading(false);
        return;
      }

      console.log('🔍 Step 2: Saving compliment to Firestore...');
      console.log('Message:', message.trim());
      
      // 4. Save compliment to Firestore
      const complimentData = {
        toUserId: recipientId,
        toUsername: recipientData.username,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
        moderationStatus: 'approved'
      };
      
      console.log('Compliment data:', complimentData);
      
      const complimentRef = await addDoc(collection(db, 'compliments'), complimentData);
      
      console.log('✅ Compliment saved with ID:', complimentRef.id);

      console.log('🔍 Step 3: Updating recipient compliment count...');
      
      // 5. Update recipient's compliment count
      await updateDoc(doc(db, 'users', recipientId), {
        complimentsReceived: increment(1)
      });
      
      console.log('✅ Recipient count updated');
      console.log('✅✅✅ Compliment sent successfully to:', recipientData.username);
      
      setSuccess(true);
      setMessage('');
      setRecipientUsername('');

      // Redirect after 2 seconds
      setTimeout(() => {
        console.log('🔄 Redirecting to inbox...');
        navigate('/inbox');
      }, 2000);

    } catch (error) {
      console.error('❌❌❌ DETAILED ERROR:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      setError('Failed to send compliment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectUser = (username) => {
    setRecipientUsername(username);
    setShowSuggestions(false);
  };

  const exampleCompliments = [
    "Your positive energy is contagious! ✨",
    "You make everyone around you feel valued and heard.",
    "Your creativity inspires others to think differently.",
    "You have an incredible ability to brighten someone's day.",
    "Your kindness doesn't go unnoticed."
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Send a <span className="text-accent">Compliment</span>
          </h1>
          <p className="text-gray-400">
            Brighten someone's day with kind words, anonymously
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg animate-fadeIn">
            <p className="text-green-400 text-center">
              ✅ Compliment sent successfully! Redirecting...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8">
          {/* Recipient Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To (Username or Link)
            </label>
            <input
              type="text"
              value={recipientUsername}
              onChange={(e) => setRecipientUsername(e.target.value)}
              onFocus={() => setShowSuggestions(filteredUsers.length > 0)}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-accent transition-colors text-white disabled:opacity-50"
              placeholder="@username or profile link"
            />

            {/* Autocomplete Suggestions */}
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => selectUser(user.username)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Compliment
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={loading}
              maxLength={500}
              rows={6}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-accent transition-colors text-white disabled:opacity-50 resize-none"
              placeholder="Write something kind and thoughtful..."
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">Minimum 10 characters</p>
              <p className="text-xs text-gray-500">{message.length}/500 characters</p>
            </div>
          </div>

          {/* Example Compliments */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              💡 Need inspiration? Try these:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleCompliments.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMessage(example)}
                  disabled={loading}
                  className="px-3 py-2 bg-gray-800/50 hover:bg-accent/10 border border-gray-700 hover:border-accent/50 rounded-lg text-xs text-gray-400 hover:text-accent transition-all disabled:opacity-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !recipientUsername.trim() || message.trim().length < 10}
            className="w-full bg-accent hover:bg-accent/90 text-black font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Sending...' : 'Send Compliment ✨'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-accent mb-3">📝 Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✅ Be genuine and specific</li>
            <li>✅ Focus on positive qualities or actions</li>
            <li>❌ No generic messages like "nice" or "cool"</li>
            <li>❌ No romantic or flirty content</li>
            <li>❌ No sarcasm or backhanded compliments</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}