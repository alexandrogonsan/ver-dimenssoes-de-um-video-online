import React, { useState, useCallback, useEffect } from 'react';
import FileUploadArea from './components/FileUploadArea';
import VideoDetails from './components/VideoDetails';

interface VideoDimensions {
  width: number;
  height: number;
}

export default function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<VideoDimensions | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setDimensions(null); 
  }, [videoUrl]);

  const handleMetadataLoaded = useCallback((width: number, height: number) => {
    setDimensions({ width, height });
  }, []);

  const handleReset = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(null);
    setVideoUrl(null);
    setDimensions(null);
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 ring-1 ring-white/10 overflow-hidden transition-all duration-300">
        <div className="p-8 sm:p-10">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">
              Video Dimension Checker
            </h1>
            <p className="mt-3 text-gray-400 max-w-md mx-auto">
              Select a video file to instantly see its resolution. All processing is done locally in your browser.
            </p>
          </header>

          {videoUrl && videoFile ? (
            <VideoDetails
              videoUrl={videoUrl}
              fileName={videoFile.name}
              dimensions={dimensions}
              onMetadataLoaded={handleMetadataLoaded}
              onReset={handleReset}
            />
          ) : (
            <FileUploadArea onFileSelect={handleFileSelect} />
          )}
        </div>
        <footer className="bg-gray-900/50 text-center py-3 px-4">
            <p className="text-xs text-gray-500">
              Built by a world-class senior frontend React engineer.
            </p>
        </footer>
      </main>
    </div>
  );
}
