import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, where, query, onSnapshot } from 'firebase/firestore';

interface TagsProps {
  userId: string;
}

const Tags: React.FC<TagsProps> = ({ userId }) => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'entries'), where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tagSet = new Set<string>();
      snapshot.docs.forEach((doc) => {
        const entryTags = doc.data().tags ? doc.data().tags.split(',').map((tag: string) => tag.trim()) : [];
        entryTags.forEach((tag: string) => tagSet.add(tag));
      });

      setTags(Array.from(tagSet));
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div>
      <h2>Your Tags</h2>
      <div>
        {tags.map((tag) => (
          <span key={tag} onClick={() => console.log(`Filter by tag: ${tag}`)}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
