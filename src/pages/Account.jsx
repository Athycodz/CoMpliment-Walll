import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Account() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchUser();
  }, []);

  const checkAuthAndFetchUser = async () => {
    // Check if user is logged in
    if (!auth.currentUser) {
      console.log('❌ No user logged in, redirecting to login...');
      navigate('/login');
      return;
    }

    try {
      console.log('✅ User logged in:', auth.currentUser.email);
      
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        console.log('✅ User data loaded:', userDoc.data());
      } else {
        console.log('❌ User document not found');
      }
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('✅ Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen pt-24 px-4 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400">User data not found</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 bg-accent text-black px-6 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Your <span className="text-accent">Account</span>
          </h1>
          <p className="text-gray-400">Manage your profile and settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 mb-6">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-accent">
                {userData.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userData.username}</h2>
              <p className="text-gray-400">{auth.currentUser.email}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-accent mb-1">
                {userData.complimentsReceived || 0}
              </p>
              <p className="text-sm text-gray-400">Compliments Received</p>
            </div>
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-accent mb-1">
                {userData.age || 'N/A'}
              </p>
              <p className="text-sm text-gray-400">Age</p>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <span className="text-gray-400">Username</span>
              <span className="text-white font-medium">@{userData.username}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <span className="text-gray-400">Email</span>
              <span className="text-white font-medium">{auth.currentUser.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <span className="text-gray-400">Account Created</span>
              <span className="text-white font-medium">
                {new Date(userData.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400">User ID</span>
              <span className="text-white font-medium text-xs">
                {auth.currentUser.uid.substring(0, 12)}...
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/inbox')}
            className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 font-semibold py-3 rounded-lg transition-all duration-300"
          >
            View Your Compliments
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-accent mb-3">📝 Privacy</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✅ Your identity is protected when sending compliments</li>
            <li>✅ Only you can see your inbox</li>
            <li>✅ Your email is never shared publicly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}