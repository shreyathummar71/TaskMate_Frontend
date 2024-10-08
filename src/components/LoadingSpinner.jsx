import coverImage from "../assets/images/Bg_spinning.png";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Cover Image */}
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-fill"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(14,14,14,0.6)]" />
      </div>
      {/* Loading Overlay (Full Screen) */}

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="80px"
          height="80px"
          viewBox="0 0 128 128"
          xmlSpace="preserve"
        >
          <rect x="0" y="0" width="100%" height="100%" fill="#171D22" />
          <g>
            <path
              d="M76.34 52.05l-43.6-43.6a63.42 63.42 0 0 1 29.7-8.2zm4.2 7.7L64.64.2A63.32 63.32 0 0 1 94.44 8zm-.08 8.86l16-59.5a63.32 63.32 0 0 1 21.94 21.6zm-4.5 7.6l43.62-43.5a63.32 63.32 0 0 1 8.17 29.7zm-7.7 4.4l59.56-15.9a63.32 63.32 0 0 1-7.78 29.8zm-8.86-.1l59.56 16a63.32 63.32 0 0 1-21.66 22zM51.8 76l43.58 43.63a63.32 63.32 0 0 1-29.72 8.17zm-4.36-7.7l15.92 59.6a63.32 63.32 0 0 1-29.82-7.8zm.1-8.83l-16 59.55A63.3 63.3 0 0 1 9.6 97.3zm4.5-7.62L8.44 95.4a63.32 63.32 0 0 1-8.2-29.72zm7.7-4.33L.16 63.36a63.32 63.32 0 0 1 7.8-29.8zm8.85.1L9 31.56A63.32 63.32 0 0 1 30.68 9.6z"
              fill="#e4d804"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="30 64 64"
              dur="500ms"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default LoadingSpinner;
