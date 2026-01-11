import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import multer from "multer";
import mongoose from "mongoose";
import sharp from "sharp";
import Analysis from "./models/Analysis.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// 2. Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// store uploaded file in memory
const upload = multer({ storage: multer.memoryStorage() });

const AZURE_VISION_ENDPOINT = process.env.AZURE_VISION_ENDPOINT;
const AZURE_VISION_KEY = process.env.AZURE_VISION_KEY;

if (!AZURE_VISION_ENDPOINT || !AZURE_VISION_KEY) {
  console.warn("AZURE_VISION_ENDPOINT or AZURE_VISION_KEY is missing in .env");
}
// 3. New Route: Generate Description using Gemini
app.post("/api/generate-description", async (req, res) => {
  const { tags, type } = req.body; // type can be 'short' or 'long'

  if (!tags || !Array.isArray(tags)) {
    return res.status(400).json({ error: "Tags are required as an array" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    // Extract tag names for the prompt
    const tagList = tags.map(t => typeof t === 'string' ? t : t.name).join(", ");

    const prompt = type === "long" 
      ? `Write a detailed, vivid, and descriptive paragraph for an image that contains: ${tagList}. Focus on atmosphere, colors, and composition.`
      : `Write a concise, catchy one-sentence caption for an image containing: ${tagList}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ description: text });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    res.status(500).json({ error: "Failed to generate description with AI" });
  }
});


// Helper: Generate thumbnail from buffer or URL
async function generateThumbnail(imageBuffer = null, imageUrl = null) {
  let buffer = imageBuffer;

  if (!buffer && imageUrl) {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    buffer = response.data;
  }

  if (!buffer) return null;

  return await sharp(buffer)
    .resize(300, 300, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toBuffer()
    .then(buf => `data:image/jpeg;base64,${buf.toString("base64")}`);
}

// sanity check
app.get("/", (req, res) => {
  res.json({ status: "Azure Vision backend is running " });
});

// Analyze by URL
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
    console.error(
      "Azure Vision URL error:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Failed to analyze image URL",
      details: error.response?.data || error.message,
    });
  }
});

// Analyze uploaded file
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

// Save analysis
app.post("/api/save-analysis", express.json({ limit: "10mb" }), async (req, res) => {
  const { description, tags, thumbnail, imageSource, originalUrl } = req.body;

  if (!description || !thumbnail || !imageSource) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const analysis = await Analysis.create({
      description,
      tags: tags || [],
      thumbnail,
      imageSource,
      originalUrl: imageSource === "url" ? originalUrl : undefined
    });

    res.json({ success: true, id: analysis._id });
  } catch (error) {
    console.error("Save analysis error:", error);
    res.status(500).json({ error: "Failed to save analysis" });
  }
});

// Get all saved analyses for History page
app.get("/api/history", async (req, res) => {
  try {
    const analyses = await Analysis.find()
      .sort({ createdAt: -1 })
      .lean();

    const formatted = analyses.map(a => ({
      id: a._id.toString(),
      description: a.description,
      thumbnail: a.thumbnail,
      date: new Date(a.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    }));

    res.json(formatted);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ error: "Failed to load history" });
  }
});

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
