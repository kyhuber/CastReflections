import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

interface StatsProps {
  userId: string;
}

const Stats: React.FC<StatsProps> = ({ userId }) => {
  const [totalReflections, setTotalReflections] = useState(0);
  const [totalPodcasts, setTotalPodcasts] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const entriesRef = collection(db, 'entries');
      const q = query(entriesRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);

      const podcastNames = new Set();
      snapshot.docs.forEach((doc) => {
        podcastNames.add(doc.data().podcast);
      });

      setTotalReflections(snapshot.size);
      setTotalPodcasts(podcastNames.size);
    };

    fetchStats();
  }, [userId]);

  return (
    <div>
      <h2>Your Stats</h2>
      <p>Total Reflections: {totalReflections}</p>
      <p>Total Podcasts Logged: {totalPodcasts}</p>
    </div>
  );
};

export default Stats;
