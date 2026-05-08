// ==================== Cloudinary Configuration ====================
import { v2 as cloudinary } from "cloudinary";
import multer               from "multer";
import dotenv               from "dotenv";
dotenv.config();

// ==================== Config ====================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

// ==================== Helper: Upload buffer to Cloudinary ====================
const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation:  [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

// ==================== Helper: Delete from Cloudinary ====================
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};

// ==================== Multer memory storage ====================
const memoryUpload = (fieldName, maxCount = 1) =>
  multer({
    storage: multer.memoryStorage(),
    limits:  { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (allowed.includes(file.mimetype)) return cb(null, true);
      cb(new Error("Only jpg, jpeg, png, webp images are allowed"));
    },
  })[maxCount === 1 ? "single" : "array"](fieldName, maxCount);

// ==================== About: single image ====================
export const uploadAboutImage = [
  memoryUpload("image", 1),
  async (req, res, next) => {
    if (!req.file) return next();
    try {
      const result = await uploadToCloudinary(req.file.buffer, "hanaa-portfolio/about");
      req.file.path     = result.secure_url;
      req.file.filename = result.public_id;
      next();
    } catch (err) {
      next(new Error("Image upload failed: " + err.message, { cause: 500 }));
    }
  },
];

// ==================== Services: single image ====================
export const uploadServiceImage = [
  memoryUpload("image", 1),
  async (req, res, next) => {
    if (!req.file) return next();
    try {
      const result = await uploadToCloudinary(req.file.buffer, "hanaa-portfolio/services");
      req.file.path     = result.secure_url;
      req.file.filename = result.public_id;
      next();
    } catch (err) {
      next(new Error("Image upload failed: " + err.message, { cause: 500 }));
    }
  },
];

// ==================== Projects: multiple images ====================
export const uploadProjectImages = [
  memoryUpload("images", 10),
  async (req, res, next) => {
    if (!req.files?.length) return next();
    try {
      const uploaded = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, "hanaa-portfolio/projects")
        )
      );
      req.files = req.files.map((file, i) => ({
        ...file,
        path:     uploaded[i].secure_url,
        filename: uploaded[i].public_id,
      }));
      next();
    } catch (err) {
      next(new Error("Image upload failed: " + err.message, { cause: 500 }));
    }
  },
];

export default cloudinary;