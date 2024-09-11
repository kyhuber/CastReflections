import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import RecentReflections from './components/RecentReflections';
import PodcastPlayer from './components/PodcastPlayer';
import Stats from './components/Stats';
import Tags from './components/Tags';
import EntryForm from './components/EntryForm';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <header>
            <h1>Welcome back, {user.displayName}!</h1>
            <img src={user.photoURL} alt="Profile" />
            <button onClick={handleSignOut}>Sign Out</button>
          </header>

          <div>
            <Stats userId={user.uid} />
            <RecentReflections userId={user.uid} setTotalEntries={setTotalEntries} />
            <EntryForm userId={user.uid} />
            <Tags userId={user.uid} />
            <PodcastPlayer src="https://open.spotify.com/embed/episode/{episode_id}" />
          </div>
        </div>
      ) : (
        <div>
          <h1>CastReflections</h1>
          <Auth />
        </div>
      )}
    </div>
  );
};

export default App;
