import React from 'react';

interface PodcastPlayerProps {
  src: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ src }) => {
  return (
    <div>
      <iframe
        src={src}
        width="100%"
        height="152"
        frameBorder="0"
        allow="encrypted-media"
        allowTransparency={true}
        allowFullScreen={false}
        title="Podcast Player"
      ></iframe>
    </div>
  );
};

export default PodcastPlayer;
