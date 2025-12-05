// backend/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import multer from "multer";

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// store uploaded file in memory
const upload = multer({ storage: multer.memoryStorage() });

const AZURE_VISION_ENDPOINT = process.env.AZURE_VISION_ENDPOINT;
const AZURE_VISION_KEY = process.env.AZURE_VISION_KEY;

if (!AZURE_VISION_ENDPOINT || !AZURE_VISION_KEY) {
  console.warn(
    "AZURE_VISION_ENDPOINT or AZURE_VISION_KEY is missing in .env"
  );
}

// sanity check
app.get("/", (req, res) => {
  res.json({ status: "Azure Vision backend is running " });
});

// analyze by URL
app.post("/api/analyze-image", async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "imageUrl is required" });
  }

  try {
    const params = new URLSearchParams({
      visualFeatures: "Description,Tags",
      "model-version": "latest",
      language: "en",
    });

    const response = await axios.post(
      `${AZURE_VISION_ENDPOINT}/vision/v3.2/analyze?${params.toString()}`,
      { url: imageUrl },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_VISION_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Azure Vision URL error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to analyze image URL",
      details: error.response?.data || error.message,
    });
  }
});

app.post(
  "/api/analyze-image-file",
  upload.single("image"), 
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "image file is required" });
    }

    try {
      const params = new URLSearchParams({
        visualFeatures: "Description,Tags",
        "model-version": "latest",
        language: "en",
      });

      const response = await axios.post(
        `${AZURE_VISION_ENDPOINT}/vision/v3.2/analyze?${params.toString()}`,
        req.file.buffer,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": AZURE_VISION_KEY,
            "Content-Type": "application/octet-stream",
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Azure Vision FILE error:",
        error.response?.data || error.message
      );
      res.status(error.response?.status || 500).json({
        error: "Failed to analyze uploaded image",
        details: error.response?.data || error.message,
      });
    }
  }
);

// fallback 404 in JSON so frontend doesn't get HTML
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
