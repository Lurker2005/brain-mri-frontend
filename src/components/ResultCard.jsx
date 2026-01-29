export default function ResultCard({ result }) {
  const isAnomaly = result.anomaly === true;

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <div className="flex items-center justify-between">
        <span
          className={`px-4 py-2 rounded-full text-white font-semibold ${
            isAnomaly ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isAnomaly ? "🔴 Anomaly Detected" : "🟢 Normal"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
        <div>
          <p className="text-gray-500">Reconstruction Error</p>
          <p className="font-semibold">{result.error}</p>
        </div>

        <div>
          <p className="text-gray-500">Threshold</p>
          <p className="font-semibold">{result.threshold}</p>
        </div>
      </div>

      {isAnomaly && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
          Highlighted regions indicate areas where the model failed to
          reconstruct normal brain anatomy.
        </div>
      )}
    </div>
  );
}
