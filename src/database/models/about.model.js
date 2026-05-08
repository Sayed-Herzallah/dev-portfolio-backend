// ==================== Import Mongoose Framework ====================
import mongoose from "mongoose";

// ==================== About Schema ====================
const aboutSchema = new mongoose.Schema(
  {
    paragraphs: {
      type:     [String],
      required: [true, "Paragraphs are required"],
    },
    image: {
      url:      { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    name:       { type: String, trim: true, default: "Hanaa" },
    university: { type: String, trim: true, default: "Mansoura University" },
    grade:      { type: String, trim: true, default: "Very Good" },
  },
  { timestamps: true }
);

// ==================== About Model ====================
export const aboutModel = mongoose.model("About", aboutSchema);
