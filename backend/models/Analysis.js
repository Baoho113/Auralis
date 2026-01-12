import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  description: { type: String, required: true },
  tags: [{
    name: { type: String, required: true },
    confidence: { type: Number, required: true }
  }],
  thumbnail: { type: String, required: true }, // base64
  imageSource: {
    type: String,
    enum: ["url", "upload"],
    required: true
  },
  originalUrl: { type: String }, // only for URL uploads
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Analysis", analysisSchema);