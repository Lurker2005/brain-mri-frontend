export default function UploadCard({ file, setFile }) {
  return (
    <div className="bg-white rounded-xl shadow p-8 text-center">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="upload"
        />
        <label htmlFor="upload" className="cursor-pointer">
          <p className="text-gray-500">
            Drag & drop MRI image or click to upload
          </p>
          {file && (
            <p className="mt-2 text-blue-600 font-medium">
              {file.name}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
