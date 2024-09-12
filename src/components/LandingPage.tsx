import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const handleSignIn = () => {
    // Add Google Sign-in logic here
  };

  return (
    <div className="landing-page">
      <div className="auth">
        <h1>CastReflections</h1>
        <h2>Capture Your Podcast Inspirations</h2>
        <p>
          CastReflections helps you document insights, thoughts, and inspirations from your favorite podcast episodes. Join now to start capturing your reflections!
        </p>
        <button onClick={handleSignIn} className="sign-in-button">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
