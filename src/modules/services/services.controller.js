// ===================== import modules =====================
import { Router }               from "express";
import { asyncHandler }         from "../../utils/errorhandling/asynchandler.js";
import * as servicesService     from "./services.service.js";
import * as servicesValidation  from "./services.validation.js";
import { validation }           from "../../middleware/validation.middleware.js";
import { uploadServiceImage }   from "../../utils/cloudinary/cloudinary.js";

// ===================== Services Router =====================
const router = Router();

// GET    /services       → getAllServices  (public)
router.get("/", asyncHandler(servicesService.getAllServices));

// GET    /services/:id   → getSingleService (public)
router.get(
  "/:id",
  validation(servicesValidation.serviceIdSchema),
  asyncHandler(servicesService.getSingleService)
);

// POST   /services       → uploadServiceImage → validation → createService
router.post(
  "/",
  uploadServiceImage,
  validation(servicesValidation.createServiceSchema),
  asyncHandler(servicesService.createService)
);

// PATCH  /services/:id   → uploadServiceImage → validation → updateService
router.patch(
  "/:id",
  uploadServiceImage,
  validation(servicesValidation.updateServiceSchema),
  asyncHandler(servicesService.updateService)
);

// DELETE /services/:id   → deleteService
router.delete(
  "/:id",
  validation(servicesValidation.serviceIdSchema),
  asyncHandler(servicesService.deleteService)
);

export default router;
