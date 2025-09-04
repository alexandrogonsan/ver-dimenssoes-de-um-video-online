Video Dimension Checker
=======================

A sleek, user-friendly tool to upload a local video file and instantly view its dimensions (width and height). All processing happens securely in the browser, ensuring user privacy.

![UI Screenshot](https://storage.googleapis.com/aistudio-project-files/5d614138-16e6-429a-8e7c-2b5a191f7a1f/17e2ef30-b30f-48d1-933e-e090f23d1c1a)

✨ Features
------------

- **Local File Processing:** Your video files are never uploaded to a server. All analysis happens directly in your browser.
- **Instant Results:** Get the width and height of your video as soon as you select the file.
- **Drag and Drop:** A convenient drag-and-drop area for easy file selection.
- **Modern UI:** A clean, responsive, and visually appealing interface built with Tailwind CSS.
- **Broad Compatibility:** Works with any standard video format your browser can play (MP4, WebM, MOV, etc.).
- **Privacy-Focused:** Since no data leaves your computer, your privacy is 100% guaranteed.

🚀 How It Works
----------------

This application leverages the browser's native capabilities to read video metadata efficiently and securely.

1.  **File Selection:** The user selects a video file via the upload button or by dragging it into the designated area.
2.  **Local URL Creation:** The browser creates a temporary, local URL for the selected file using `URL.createObjectURL()`. This allows the file to be used in the DOM without uploading it.
3.  **Metadata Loading:** A hidden `<video>` element is created in the React component, with its `src` attribute set to the local URL. The `preload="metadata"` attribute tells the browser to only fetch the video's metadata (like dimensions, duration, etc.) without downloading the entire video content.
4.  **Dimension Extraction:** When the metadata is loaded, the `onLoadedMetadata` event is triggered. We access `video.videoWidth` and `video.videoHeight` from the video element to get the dimensions.
5.  **Display:** The extracted width and height are then displayed in the UI.
6.  **Cleanup:** When a new video is chosen or the component is unmounted, `URL.revokeObjectURL()` is called to release the memory used by the local URL.

💻 Tech Stack
--------------

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **No Build Step**: The project uses ES modules and an `importmap` directly in the browser, requiring no local build process to run.

🏃‍♀️ Getting Started
------------------

No complex setup is required. To run this application, simply open the `index.html` file in any modern web browser.

1.  Clone this repository or download the source code.
2.  Navigate to the project directory.
3.  `npm install`
4.  `npm run dev`

📂 Project Structure
---------------------

```
.
├── components/
│   ├── FileUploadArea.tsx  # Component for the file selection UI
│   └── VideoDetails.tsx    # Component to display the video and its dimensions
├── App.tsx                 # Main application component and state management
├── index.html              # The main HTML file (entry point)
├── index.tsx               # React application bootstrap
├── metadata.json           # Project metadata
└── README.md               # You are here!
```
