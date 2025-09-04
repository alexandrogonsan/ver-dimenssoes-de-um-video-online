import React, { useRef } from 'react';

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
}

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 14h.01m-2.5-3h.01m-2.5-3h.01M3 14a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v2M3 10a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v2m-6 4a2 2 0 01-2-2v-2a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-2z" />
  </svg>
);


const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onFileSelect(file);
    } else if (file) {
      alert('Please select a valid video file.');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="w-full text-center p-8 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-gray-800 transition-colors duration-300"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadIcon />
        <p className="text-gray-400">
          <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">Any standard video format (MP4, MOV, etc.)</p>
      </div>
    </div>
  );
};

export default FileUploadArea;
