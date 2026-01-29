import { useState, useEffect } from "react";

export default function ImageViewer({ file, heatmap }) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [originalUrl, setOriginalUrl] = useState(null);

  // Create & cleanup object URL properly
  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Visualization</h3>

        {heatmap && (
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="text-sm text-blue-600"
          >
            {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 items-start">
        {/* Original MRI */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Original MRI</p>
          {originalUrl && (
            <img
              src={originalUrl}
              alt="MRI"
              className="rounded-lg w-full object-contain"
            />
          )}
        </div>

        {/* Heatmap */}
        {showHeatmap && heatmap && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Heatmap Overlay</p>
            <img
              src={`data:image/png;base64,${heatmap}`}
              alt="Heatmap"
              className="rounded-lg w-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
