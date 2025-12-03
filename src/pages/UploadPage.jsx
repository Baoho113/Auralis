import { useEffect, useState } from "react";
import ImageUploadButton from "../components/ImageUploadButton";
import "./UploadPage.css";

const uploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile && !imageUrl.trim()) {
      alert("Please upload an image or paste an image URL first.");
      return;
    }

    console.log("Selected file:", selectedFile);
    console.log("Pasted URL:", imageUrl);
  };

  return (
    <section className="upload-page">
      <h1 className="upload-title">Understand Images. Effortlessly.</h1>
      <p className="upload-subtitle">
        Upload an image or paste a URL to receive a clear, AI-generated
        description optimized for screen readers.
      </p>

      <form className="upload-upload-form" onSubmit={handleSubmit}>
        <ImageUploadButton onFileSelect={handleFileSelect} />
        <span className="upload-upload-or">OR</span>
        <input
          type="url"
          className="upload-input-url"
          placeholder="Paste Image URL"
          aria-label="Paste Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Analyze
        </button>
      </form>

      {selectedFile && (
        <p className="upload-file-name">Selected: {selectedFile.name}</p>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Selected preview"
          className="upload-preview"
        />
      )}

      <p className="upload-aria-status">ARIA-Live Region: Ready for analysis</p>
    </section>
  );
};

export default uploadPage;
