import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Search: React.FC = () => {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (queryText === '') return;

    const q = query(
      collection(db, 'entries'),
      where('text', '>=', queryText),
      where('text', '<=', queryText + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    setResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div>
      <input
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
        placeholder="Search entries..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
