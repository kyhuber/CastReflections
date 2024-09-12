import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';

interface RecentReflectionsProps {
  userId: string;
  setTotalEntries: (count: number) => void;
}

const RecentReflections: React.FC<RecentReflectionsProps> = ({ userId, setTotalEntries }) => {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'entries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(fetchedEntries);
      setTotalEntries(fetchedEntries.length);
    });

    return () => unsubscribe();
  }, [userId, setTotalEntries]);

  return (
    <div>
      <h2>Your Recent Reflections</h2>
      {entries.slice(0, 5).map((entry) => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <p><em>{entry.podcast}</em> - {entry.timestamp}</p>
          <p>{entry.notes.substring(0, 100)}...</p>
          <button>View Full Reflection</button>
        </div>
      ))}
    </div>
  );
};

export default RecentReflections;