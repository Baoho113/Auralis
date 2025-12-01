import { useEffect, useState } from "react";
import ImageUploadButton from "../components/ImageUploadButton";
import "./HomePage.css";

const HomePage = () => {
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
    <section className="home-page">
      <h1 className="home-title">Understand Images. Effortlessly.</h1>
      <p className="home-subtitle">
        Upload an image or paste a URL to receive a clear, AI-generated
        description optimized for screen readers.
      </p>

      <form className="home-upload-form" onSubmit={handleSubmit}>
        <ImageUploadButton onFileSelect={handleFileSelect} />
        <span className="home-upload-or">OR</span>
        <input
          type="url"
          className="home-input-url"
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
        <p className="home-file-name">Selected: {selectedFile.name}</p>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Selected preview"
          className="home-preview"
        />
      )}

      <p className="home-aria-status">ARIA-Live Region: Ready for analysis</p>
    </section>
  );
};

export default HomePage;
