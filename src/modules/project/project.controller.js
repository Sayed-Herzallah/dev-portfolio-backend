// ===================== import modules =====================
import { Router }               from "express";
import { asyncHandler }         from "../../utils/errorhandling/asynchandler.js";
import * as projectService      from "./project.service.js";
import * as projectValidation   from "./project.validation.js";
import { validation }           from "../../middleware/validation.middleware.js";
import { uploadProjectImages }  from "../../utils/cloudinary/cloudinary.js";

// ===================== Project Router =====================
const router = Router();

// GET    /projects       → getAllProjects  (public)
router.get("/", asyncHandler(projectService.getAllProjects));

// GET    /projects/:id   → getSingleProject (public)
router.get(
  "/:id",
  validation(projectValidation.projectIdSchema),
  asyncHandler(projectService.getSingleProject)
);

// POST   /projects       → uploadProjectImages → validation → createProject
router.post(
  "/",
  uploadProjectImages,
  validation(projectValidation.createProjectSchema),
  asyncHandler(projectService.createProject)
);

// PATCH  /projects/:id   → uploadProjectImages → validation → updateProject
router.patch(
  "/:id",
  uploadProjectImages,
  validation(projectValidation.updateProjectSchema),
  asyncHandler(projectService.updateProject)
);

// DELETE /projects/:id   → deleteProject
router.delete(
  "/:id",
  validation(projectValidation.projectIdSchema),
  asyncHandler(projectService.deleteProject)
);

export default router;
