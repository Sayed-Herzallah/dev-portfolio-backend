// =================================== Validation Schema — Services ===================================
import joi from "joi";
import { monggoseID } from "../../middleware/validation.middleware.js";

// ==================== Service ID Schema ====================
export const serviceIdSchema = joi.object({
  id: monggoseID("Service ID").required(),
});

// ==================== 1) Create Service ====================
export const createServiceSchema = joi.object({
  title: joi.string().trim().required().messages({
    "any.required": "Service title is required",
    "string.empty": "Service title is required",
  }),
  items:           joi.array().items(joi.string().trim()).allow(null),
  cta:             joi.string().trim().allow("", null),
  backgroundClass: joi.string().trim().allow("", null),
  order:           joi.number().integer().allow(null),
  isVisible:       joi.boolean().allow(null),
  file:            joi.any(),
});

// ==================== 2) Update Service ====================
export const updateServiceSchema = joi.object({
  id:              monggoseID("Service ID").required(),
  title:           joi.string().trim(),
  items:           joi.array().items(joi.string().trim()).allow(null),
  cta:             joi.string().trim().allow("", null),
  backgroundClass: joi.string().trim().allow("", null),
  order:           joi.number().integer().allow(null),
  isVisible:       joi.boolean().allow(null),
  file:            joi.any(),
}).min(2).messages({
  "object.missing": "At least one field must be provided",
});
