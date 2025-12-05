import { useEffect, useState } from "react";
import ImageUploadButton from "../components/ImageUploadButton";
import "./UploadPage.css";

const API_BASE_URL = "http://localhost:5000";

const UploadPage = () => {
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
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch(`${API_BASE_URL}/api/analyze-image-file`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
    }

    if (!response.ok) {
      const message =
        data?.error || text || "Failed to analyze uploaded image";
      throw new Error(message);
    }

    return data;
  };


  const analyzeUrl = async () => {
    if (!imageUrl.trim()) return;

    const response = await fetch(`${API_BASE_URL}/api/analyze-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imageUrl.trim() }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to analyze image URL");
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
      let result;
      if (selectedFile) {
        result = await analyzeFile();
      } else {
        result = await analyzeUrl();
      }

      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while analyzing.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (!analysis) return;

    const existing =
      JSON.parse(localStorage.getItem("savedAnalyses") || "[]");

    const topDescription = analysis.description?.captions?.[0]?.text || "";
    const tags = (analysis.tags || []).map((t) => ({
      name: t.name,
      confidence: t.confidence,
    }));

    const newEntry = {
      id: Date.now(),
      sourceType: selectedFile ? "file" : "url",
      fileName: selectedFile?.name || null,
      imageUrl: !selectedFile ? imageUrl.trim() : null,
      description: topDescription,
      tags,
      createdAt: new Date().toISOString(),
    };

    const updated = [...existing, newEntry];
    localStorage.setItem("savedAnalyses", JSON.stringify(updated));
    setIsSaved(true);
  };

  const topDescription = analysis?.description?.captions?.[0]?.text || "";
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
          aria-label="Paste Image URL"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            if (e.target.value) {
              setSelectedFile(null);
              setPreviewUrl("");
            }
            setAnalysis(null);
            setError("");
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

            {topDescription && (
              <p className="upload-description">
                <strong>Description: </strong>
                {topDescription}
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
            : "ARIA-Live Region: Ready for analysis"}
      </p>
    </section>
  );
};

export default UploadPage;
