import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LandingPage from './components/LandingPage';
import RecentReflections from './components/RecentReflections';
import PodcastPlayer from './components/PodcastPlayer';
import Stats from './components/Stats';
import Tags from './components/Tags';
import EntryForm from './components/EntryForm';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

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

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="container">
      <header>
        <h1>Welcome back, {user.displayName}!</h1>
        <button onClick={() => signOut(auth)}>Sign Out</button>
      </header>
      {/* The rest of your logged-in user interface */}
    </div>
  );
};

export default App;
