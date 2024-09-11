import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const EntryForm: React.FC = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === '') return;

    try {
      // Add a new document with a generated id.
      await addDoc(collection(db, 'entries'), {
        text,
        createdAt: serverTimestamp()
      });
      setText(''); // Clear the input field
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your takeaway here..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntryForm;
