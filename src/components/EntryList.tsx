import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const EntryList: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'entries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          {entry.text}
          <br />
          <small>{new Date(entry.createdAt?.seconds * 1000).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
