// ==================== Import Mongoose Framework ====================
import mongoose from "mongoose";

// ==================== Image Sub-Schema ====================
const imageSchema = new mongoose.Schema({
  url:      { type: String, required: true },
  publicId: { type: String, required: true },
});

// ==================== Project Schema ====================
const projectSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Project title is required"],
      trim:     true,
    },
    type: {
      type:     String,
      enum:     ["experience", "additional", "wordpress"],
      required: [true, "Project type is required"],
    },
    role:          { type: String, trim: true },
    overview:      { type: String, trim: true },
    overviewLabel: { type: String, trim: true },
    detailsLabel:  { type: String, trim: true },
    details:       { type: String, trim: true },
    summaryLabel:  { type: String, trim: true },
    summary:       { type: String, trim: true },
    listTitle:     { type: String, trim: true },
    listItems:     [{ type: String, trim: true }],
    outro:         { type: String, trim: true },
    project:       { type: String, trim: true },
    link:          { type: String, trim: true },
    mediaKind: {
      type:    String,
      enum:    ["single", "images", "none"],
      default: "none",
    },
    images:          [imageSchema],
    backgroundClass: { type: String, default: "bg-linen" },
    order:           { type: Number, default: 0 },
    isVisible:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ==================== Project Model ====================
export const projectModel = mongoose.model("Project", projectSchema);
