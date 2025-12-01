// src/components/ImageUploadButton.jsx
import { useRef } from "react";

const ImageUploadButton = ({
  onFileSelect,
  label = "Upload an image",
  className = "btn btn-primary",
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <button type="button" className={className} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};

export default ImageUploadButton;
