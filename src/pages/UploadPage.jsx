import { useEffect, useState } from "react";
import ImageUploadButton from "../components/ImageUploadButton";
import { saveHistoryItem } from "../utils/historyStorage";
import { useCookies } from "../context/CookieContext";
import "./UploadPage.css";

const UploadPage = () => {
  const { cookies } = useCookies();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setImageUrl("");
    setAnalysis(null);
    setError("");
    setIsSaved(false);
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

    const response = await fetch("http://localhost:5000/api/analyze-image-file", {
      method: "POST",
      body: formData,
    });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !imageUrl.trim()) {
      alert("Please upload an image or paste an image URL first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);
    setIsSaved(false);

    try {
      const result = selectedFile ? await analyzeFile() : await analyzeUrl();
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError(err.message || "Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!analysis || isSaved) return;

    if (!cookies.functional) {
      alert("History saving is disabled in cookie settings.");
      return;
    }

    setIsSaved(true);

    try {
      const imageSrc = previewUrl || imageUrl.trim();
      if (!imageSrc) throw new Error("No image source");

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;

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

      const thumbnail = canvas.toDataURL("image/jpeg", 0.8);

      saveHistoryItem({
        id: crypto.randomUUID(),
        imageUrl: thumbnail,
        prompt:
          analysis.description?.captions?.[0]?.text ||
          "No description available",
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Save failed:", err);
      alert("Could not save analysis.");
      setIsSaved(false);
    }
  };

  const description = analysis?.description?.captions?.[0]?.text || "";
  const tags = analysis?.tags || [];

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
            setAnalysis(null);
            setIsSaved(false);
          }}
        />

        <button type="submit" className="btn btn-primary" disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze"}
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

      {error && <p className="upload-error">{error}</p>}

      <div className="upload-analysis">
        {analysis ? (
          <>
            <h2>Image Analysis</h2>

            {description && (
              <p className="upload-description">
                <strong>Description:</strong> {description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="upload-tags">
                <strong>Tags:</strong>
                <ul>
                  {tags.map((tag) => (
                    <li key={tag.name}>
                      {tag.name}{" "}
                      <span className="tag-confidence">
                        ({(tag.confidence * 100).toFixed(1)}%)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSave}
              disabled={isSaved}
            >
              {isSaved ? "Saved ✅" : "Save this analysis"}
            </button>
          </>
        ) : (
          !isAnalyzing && (
            <p className="upload-analysis-placeholder">
              Analysis results will appear here.
            </p>
          )
        )}
      </div>

      <p className="upload-aria-status" aria-live="polite">
        {isAnalyzing
          ? "Analyzing image..."
          : analysis
          ? "Analysis complete."
          : "Ready for analysis"}
      </p>
    </section>
  );
};

export default UploadPage;
