import React from "react";

const OverlayLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 z-50 pointer-events-auto">
      <div className="text-center bg-white/80 rounded-2xl px-24 py-36">
        <h1 className="text-xl font-semibold mb-4">Loading...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default OverlayLoading;