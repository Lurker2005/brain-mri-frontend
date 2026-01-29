import { useState } from "react";
import axios from "axios";

import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import ImageViewer from "./components/ImageViewer";

// 🔥 Backend (ngrok or real domain – both work)
const API_URL = "https://c7e8a253794b.ngrok-free.app/predict";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeMRI = async () => {
    if (!file) {
      alert("Please upload an MRI image");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setResult({
        anomaly: response.data.anomaly,
        error: response.data.reconstruction_error,
        threshold: response.data.threshold,
        heatmap: response.data.heatmap_base64 || null,
      });

    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to analyze MRI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Brain MRI Anomaly Detection
          </h1>
          <p className="text-gray-600 mt-2">
            Unsupervised detection using Convolutional Autoencoders
          </p>
        </header>

        {/* Upload */}
        <UploadCard file={file} setFile={setFile} />

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={analyzeMRI}
            disabled={loading}
            className={`px-8 py-3 rounded-lg shadow transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze MRI"}
          </button>

          {loading && (
            <p className="mt-3 text-gray-500 animate-pulse">
              Analyzing MRI slice…
            </p>
          )}
        </div>

        {/* Results */}
        {result && (
          <>
            <ResultCard result={result} />
            <ImageViewer file={file} heatmap={result.heatmap} />
          </>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-10">
          Powered by Deep Learning (CAE)
        </footer>

      </div>
    </div>
  );
}

export default App;
