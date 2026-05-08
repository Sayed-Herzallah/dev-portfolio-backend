// ==================== Import Mongoose Framework ====================
import mongoose from "mongoose";

// ==================== Service Schema ====================
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Service title is required"],
      trim:     true,
    },
    items: {
      type:    [String],
      default: [],
    },
    cta: {
      type:    String,
      trim:    true,
      default: "",
    },
    backgroundClass: {
      type:    String,
      default: "bg-[#e9eeff]",
    },
    image: {
      url:      { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    order:     { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ==================== Service Model ====================
export const serviceModel = mongoose.model("Service", serviceSchema);
