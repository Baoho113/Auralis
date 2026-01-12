import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadButton from "../components/ImageUploadButton";
import "./UploadPage.css";

const UploadPage = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setImageUrl("");
    setError("");
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

  const analyzeFile = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch(
      "http://localhost:5000/api/analyze-image-file",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to analyze image");
    }

    return data;
  };

  const analyzeUrl = async () => {
    const response = await fetch("http://localhost:5000/api/analyze-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imageUrl.trim() }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to analyze image URL");
    }

    return data;
  };

  const createThumbnail = async (src) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );

    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    return canvas.toDataURL("image/jpeg", 0.8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !imageUrl.trim()) {
      alert("Please upload an image or paste an image URL first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const analysis = selectedFile
        ? await analyzeFile()
        : await analyzeUrl();

      const imageSrc = previewUrl || imageUrl.trim();
      const thumbnail = await createThumbnail(imageSrc);

      navigate("/results", {
        state: {
          imageSrc,
          thumbnail,
          description:
            analysis.description?.captions?.[0]?.text ||
            "No description available",
          tags: analysis.tags || [],
        },
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
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
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setSelectedFile(null);
            setPreviewUrl("");
          }}
        />

        <button type="submit" className="btn btn-primary" disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {selectedFile && (
        <p className="upload-file-name">Selected: {selectedFile.name}</p>
      )}

      {(previewUrl || imageUrl) && (
        <div className="upload-preview-container">
          <img
            src={previewUrl || imageUrl}
            alt="Selected preview"
            className="upload-preview"
          />
        </div>
      )}

      {error && <p className="upload-error">{error}</p>}

      <p className="upload-aria-status" aria-live="polite">
        {isAnalyzing ? "Analyzing image..." : "Ready for analysis"}
      </p>
    </section>
  );
};

export default UploadPage;
