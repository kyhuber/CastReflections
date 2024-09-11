import React from 'react';
import Auth from './components/Auth';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Search from './components/Search';
import PodcastPlayer from './components/PodcastPlayer';

const App: React.FC = () => {
  return (
    <div>
      <h1>CastReflections</h1>
      {/* Google Authentication */}
      <Auth />

      {/* Search Entries */}
      <Search />

      {/* Form to Add New Entries */}
      <EntryForm />

      {/* List of Previous Entries */}
      <EntryList />

      {/* Podcast Player (Optional) */}
      <PodcastPlayer src="https://your-podcast-url.com/episode.mp3" />
    </div>
  );
};

export default App;
