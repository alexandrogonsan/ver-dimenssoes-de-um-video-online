import React from 'react';

interface VideoDimensions {
  width: number;
  height: number;
}

interface VideoDetailsProps {
  videoUrl: string;
  fileName: string;
  dimensions: VideoDimensions | null;
  onMetadataLoaded: (width: number, height: number) => void;
  onReset: () => void;
}

const DimensionsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
    </svg>
);

const VideoDetails: React.FC<VideoDetailsProps> = ({ videoUrl, fileName, dimensions, onMetadataLoaded, onReset }) => {
  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = e.currentTarget;
    onMetadataLoaded(videoWidth, videoHeight);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <video
          src={videoUrl}
          onLoadedMetadata={handleVideoMetadata}
          controls
          className="w-full rounded-lg shadow-lg bg-black"
          preload="metadata"
        />
      </div>
      
      <div className="bg-gray-900/50 p-4 rounded-lg ring-1 ring-white/10">
        <h3 className="text-sm font-medium text-gray-400 truncate mb-3" title={fileName}>
          File: <span className="text-gray-300 font-mono">{fileName}</span>
        </h3>
        
        {dimensions ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Width</p>
              <p className="text-2xl font-bold text-cyan-400">{dimensions.width}px</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Height</p>
              <p className="text-2xl font-bold text-cyan-400">{dimensions.height}px</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-6 bg-gray-800 rounded-md">
            <DimensionsIcon />
            <p className="text-gray-400 animate-pulse">Reading video dimensions...</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          Choose Another Video
        </button>
      </div>
    </div>
  );
};

export default VideoDetails;
