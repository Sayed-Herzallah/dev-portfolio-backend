// ===================== import modules =====================
import { Router }          from "express";
import { asyncHandler }    from "../../utils/errorhandling/asynchandler.js";
import * as aboutService   from "./about.service.js";
import * as aboutValidation from "./about.validation.js";
import { validation }      from "../../middleware/validation.middleware.js";
import { uploadAboutImage } from "../../utils/cloudinary/cloudinary.js";

// ===================== About Router =====================
const router = Router();

// GET  /about       → getAbout
router.get("/", asyncHandler(aboutService.getAbout));

// PATCH /about      → uploadAboutImage → validation → updateAbout
router.patch(
  "/",
  uploadAboutImage,
  validation(aboutValidation.updateAboutSchema),
  asyncHandler(aboutService.updateAbout)
);

export default router;
