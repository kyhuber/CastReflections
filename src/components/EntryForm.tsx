import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface EntryFormProps {
  userId: string;
}

const EntryForm: React.FC<EntryFormProps> = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [podcast, setPodcast] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title === '' || podcast === '' || notes === '') return;

    try {
      await addDoc(collection(db, 'entries'), {
        title,
        podcast,
        timestamp,
        notes,
        mood,
        tags,
        userId,
        createdAt: serverTimestamp()
      });

      // Clear the form
      setTitle('');
      setPodcast('');
      setTimestamp('');
      setNotes('');
      setMood('');
      setTags('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title or Topic" required />
      <input type="text" value={podcast} onChange={(e) => setPodcast(e.target.value)} placeholder="Podcast Name and Episode" required />
      <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="Timestamp (e.g., 15:23)" />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write your takeaway or reflection here..." required />
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">Select Mood</option>
        <option value="Inspired">Inspired</option>
        <option value="Excited">Excited</option>
        <option value="Confused">Confused</option>
        <option value="Intrigued">Intrigued</option>
      </select>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (e.g., technology, philosophy)" />
      <button type="submit">Submit Reflection</button>
    </form>
  );
};

export default EntryForm;
